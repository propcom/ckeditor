// $Id$

// this object will store teaser information
function Toggle(textarea_id, TextTextarea, TextRTE, xss_check) {
  if (typeof(CKEDITOR.instances[textarea_id]) != 'undefined') {
    CKEDITOR.instances[textarea_id].destroy();
    $('#switch_'+textarea_id).text(TextRTE);
  } else {
    CKEDITOR.replace(textarea_id, Drupal.settings.ckeditor.settings[textarea_id]);
    $('#switch_'+textarea_id).text(TextTextarea);
  }
}

/**
 * CKEditor autostart
 */
$(document).ready(function () {
  if (Drupal.settings.ckeditor) {
    //removing teaser
    for (var x in Drupal.settings.teaser) {
    //console.log();
      $("#"+Drupal.settings.teaser[x]).val(
        $("#"+x).val()+'\n<!--break-->\n'+$("#"+Drupal.settings.teaser[x]).val()
      );
      $("#"+x).parent().parent().hide();
    }
    
    //autostart instances of CKEditor
    for (var textarea_id in Drupal.settings.ckeditor.autostart) {
      CKEDITOR.replace(textarea_id, Drupal.settings.ckeditor.settings[textarea_id]);
    }
    
  }
});
