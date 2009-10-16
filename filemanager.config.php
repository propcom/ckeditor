<?php

// $Id$
/**
 * FCKeditor - The text editor for Internet - http://www.fckeditor.net
 * Copyright (C) 2003-2008 Frederico Caldeira Knabben
 *
 * == BEGIN LICENSE ==
 *
 * Licensed under the terms of any of the following licenses at your
 * choice:
 *
 *  - GNU General Public License Version 2 or later (the "GPL")
 *    http://www.gnu.org/licenses/gpl.html
 *
 *  - GNU Lesser General Public License Version 2.1 or later (the "LGPL")
 *    http://www.gnu.org/licenses/lgpl.html
 *
 *  - Mozilla Public License Version 1.1 or later (the "MPL")
 *    http://www.mozilla.org/MPL/MPL-1.1.html
 *
 * == END LICENSE ==
 *
 * @file
 * FCKeditor Module for Drupal 6.x
 *
 * This file is required by FCKeditor module if you want to enable built-in file management functionality
 *
 * This useful script does the following:
 * - authenticate users that are allowed to use file browser
 * - redefine the $Config['UserFilesPath'] and $Config['UserFilesAbsolutePath'] according to the values set in FCKeditor profile
 */

$GLOBALS['devel_shutdown'] = FALSE;

$fck_user_files_path = '';
$fck_user_files_absolute_path = '';

function CheckAuthentication() {
  static $authenticated;

  if (!isset($authenticated)) {
    if (!empty($_SERVER['SCRIPT_FILENAME'])) {
      $drupal_path = dirname(dirname(dirname(dirname($_SERVER['SCRIPT_FILENAME']))));
      if (!file_exists($drupal_path .'/includes/bootstrap.inc')) {
        $drupal_path = dirname(dirname(dirname($_SERVER['SCRIPT_FILENAME'])));
        $depth = 2;
        do {
          $drupal_path = dirname($drupal_path);
          $depth ++;
        }
        while (!($bootstrap_file_found = file_exists($drupal_path .'/includes/bootstrap.inc')) && $depth<10);
      }
    }

    if (!isset($bootstrap_file_found) || !$bootstrap_file_found) {
      $drupal_path = '../../../';
      if (!file_exists($drupal_path .'/includes/bootstrap.inc')) {
        $drupal_path = '../..';
        do {
          $drupal_path .= '/..';
          $depth = substr_count($drupal_path, '..');
        print "Checking $drupal_path /includes/bootstrap.inc...<br/>";
        }
        while (!($bootstrap_file_found = file_exists($drupal_path .'/includes/bootstrap.inc')) && $depth < 10);
      }
    }
    if (!isset($bootstrap_file_found) || $bootstrap_file_found) {
      $current_cwd = getcwd();
      chdir($drupal_path);
      require_once './includes/bootstrap.inc';
      drupal_bootstrap(DRUPAL_BOOTSTRAP_FULL);
      $authenticated = user_access('post comments');
      if (isset($_SESSION['CKEditor']['UserFilesPath'], $_SESSION['CKEditor']['UserFilesAbsolutePath'])) {
        $GLOBALS['ckfinder_user_files_path'] = $_SESSION['CKEditor']['UserFilesPath'];
        $GLOBALS['ckfinder_user_files_path'] = $_SESSION['CKEditor']['UserFilesAbsolutePath'];
      }
      chdir($current_cwd);
    }
  }

  return $authenticated;
}

CheckAuthentication();

if (!empty($ckfinder_user_files_path)) {
  $baseUrl = $ckfinder_user_files_path;
  $baseDir = $ckfinder_user_files_absolute_path;
}
else {
  // Nothing in session? Shouldn't happen... anyway let's try to upload it in the (almost) right place
  // Path to user files relative to the document root.
  $$baseUrl = strtr(base_path(), array(
    '/modules/ckeditor/ckfinder/core/connector/php' => '',
  )) . file_directory_path() .'/';
}
