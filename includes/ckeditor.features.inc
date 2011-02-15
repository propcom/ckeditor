<?php

/**
 * Implementation of hook_features_export_options()
 */
function ckeditor_profile_features_export_options()  {
  $options = array();
  $profiles = (array) ckeditor_profile_load();
  foreach ($profiles as $name => $profile) {
    $options[$name] = $profile->name;
  }
  return $options;
}

/**
 * Implementation of hook_features_export()
 */
function ckeditor_profile_features_export($data, &$export, $module_name = '') {
  $pipe = array();
  foreach ((array)$data as $name) {
    $profile = ckeditor_profile_load($name);
    if ($profile) {
      $export['features']['ckeditor_profile'][$name] = $name;

      // Write dependencies on all the roles referenced by this profile
      foreach ((array) $profile->rids as $rid => $role_name) {
        $pipe['user_role'][] = $role_name;
      }
    }
  }
  $export['dependencies'][] = 'ckeditor';
  return $pipe;
}

/**
 * Implementation of hook_features_export_render()
 */
function ckeditor_profile_features_export_render($module_name, $data) {
  $profiles = array();
  $roles = user_roles();
  foreach ($data as $name) {
    $profile = (array) ckeditor_profile_load($name);

    // Convert Role IDs into role names only
    $roles = array_values((array) $profile['rids']);
    if (empty($roles)) {
      $profile['roles'] = array();
    }
    else {
      $profile['roles'] = array_combine($roles, $roles);
    }
    unset($profile['rids']);

    $profiles[$name] = $profile;
  }
  $code = '  $data = '. features_var_export($profiles, '  ') .';'. PHP_EOL;
  $code .= '  return $data;';

  return array('ckeditor_profile_defaults' => $code);
}

/**
 * Implementation of hook_features_revert()
 */
function ckeditor_profile_features_revert($module) {
  $data = module_invoke($module, 'ckeditor_profile_defaults');
  $roles = user_roles();
  foreach ($data as $name => $profile) {
    // Restore the profile settings
    db_query("DELETE FROM {ckeditor_settings} WHERE name = '%s'", $name);
    db_query("INSERT INTO {ckeditor_settings} (name, settings) VALUES('%s', '%s')", $name, serialize($profile['settings']));

    // Restore the profile roles
    foreach ($roles as $rid => $role_name) {
      if (in_array($role_name, (array) $profile['roles'])) {
        if (!db_result(db_query("SELECT rid FROM {ckeditor_role} WHERE rid = %d AND name = '%s'", $rid, $name))) {
          db_query("INSERT INTO {ckeditor_role} (rid, name) VALUES(%d, '%s')", $rid, $name);
        }
      }
      else {
        // Make sure they don't have access
        db_query("DELETE FROM {ckeditor_role} WHERE rid = %d AND name = '%s'", $rid, $name);
      }
    }
  }
}