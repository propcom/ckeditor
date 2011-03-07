/*
 * CKEditor - The text editor for the Internet - http://ckeditor.com
 * Copyright (c) 2003-2011, CKSource - Frederico Knabben. All rights reserved.
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
 * CKEditor Module for Drupal 7.x
 *
 * This module allows Drupal to replace textarea fields with CKEditor.
 *
 * This HTML text editor brings to the web many of the powerful functionalities
 * of known desktop editors like Word. It's really  lightweight and doesn't
 * require any kind of installation on the client computer.
 */
(function ($) {
    CKEDITOR.on( 'dialogDefinition', function( ev )
    {
        var dialogName = ev.data.name;
        var dialogDefinition = ev.data.definition;

        if ( dialogName == 'uicolor' )
        {
            // Get a reference to the configBox and hide it (cannot be removed).
            var configBox = dialogDefinition.getContents( 'tab1' ).get( 'configBox' );
            configBox.style = 'display:none';
        }
    });

    $(document).ready(function() {
        if (typeof(CKEDITOR) == "undefined")
            return;

        $('#edit-uicolor-textarea').show();

        Drupal.ckeditorUiColorOnChange = function() {
            var color = CKEDITOR.instances["edit-uicolor-textarea"].getUiColor();
            if ($("#edit-uicolor").val() == "custom" && typeof(color) != "undefined") {
                $('input[name$="uicolor_user"]').val(color);
            }
        };

        if ( $("#edit-skin").val() == "kama" ){
            $("#edit-uicolor").removeAttr('disabled');
            $("#edit-uicolor").parent().removeClass('form-disabled');
            CKEDITOR.replace("edit-uicolor-textarea",
            {
                extraPlugins : 'uicolor',
                height: 60,
                uiColor: $('input[name$="uicolor_user"]').val() || '#D3D3D3',
                width: 400,
                toolbar : [[ 'Bold', 'Italic', '-', 'NumberedList', 'BulletedList'],[ 'UIColor' ]],
                skin: $("#edit-skin").val(),
                on:
                {
                    focus : Drupal.ckeditorUiColorOnChange,
                    blur : Drupal.ckeditorUiColorOnChange
                }
            });
        }
        else {
            $("#edit-uicolor").attr('disabled', 'disabled');
            $("#edit-uicolor").parent().addClass('form-disabled');
            CKEDITOR.replace("edit-uicolor-textarea",
            {
                height: 60,
                uiColor: $('input[name$="uicolor_user"]').val() || '#D3D3D3',
                width: 400,
                toolbar : [[ 'Bold', 'Italic', '-', 'NumberedList', 'BulletedList']],
                skin: $("#edit-skin").val(),
                on:
                {
                    focus : Drupal.ckeditorUiColorOnChange,
                    blur : Drupal.ckeditorUiColorOnChange
                }
            });
        }

        $("#edit-skin").bind("change", function() {
            CKEDITOR.instances["edit-uicolor-textarea"].destroy();
            if ( $("#edit-skin").val() == "kama" ){
                $("#edit-uicolor").removeAttr('disabled');
                $("#edit-uicolor").parent().removeClass('form-disabled');
                CKEDITOR.replace("edit-uicolor-textarea",
                {
                    extraPlugins : 'uicolor',
                    height: 60,
                    uiColor: $('input[name$="uicolor_user"]').val() || '#D3D3D3',
                    width: 400,
                    toolbar: [[ 'Bold', 'Italic', '-', 'NumberedList', 'BulletedList'],[ 'UIColor' ]],
                    skin: $("#edit-skin").val(),
                    on:
                    {
                        focus : Drupal.ckeditorUiColorOnChange,
                        blur : Drupal.ckeditorUiColorOnChange
                    }
                });
            }
            else {
                $("#edit-uicolor").attr('disabled', 'disabled');
                $("#edit-uicolor").parent().addClass('form-disabled');
                CKEDITOR.replace("edit-uicolor-textarea",
                {
                    height: 60,
                    uiColor: $('input[name$="uicolor_user"]').val() || '#D3D3D3',
                    width: 400,
                    toolbar: [[ 'Bold', 'Italic', '-', 'NumberedList', 'BulletedList']],
                    skin: $("#edit-skin").val(),
                    on:
                    {
                        focus : Drupal.ckeditorUiColorOnChange,
                        blur : Drupal.ckeditorUiColorOnChange
                    }
                });
            }
        });

        $("#edit-uicolor").bind("change", function() {
            if (typeof(Drupal.settings.ckeditor_uicolor) != "undefined") {
                CKEDITOR.instances["edit-uicolor-textarea"].setUiColor(Drupal.settings.ckeditor_uicolor[$(this).val()]);
            }
            if ($(this).val() != "custom") {
                $('input[name$="uicolor_user"]').val("");
            }
            else {
                var color = CKEDITOR.instances["edit-uicolor-textarea"].getUiColor();
                if (typeof(color) != "undefined") {
                    $('input[name$="uicolor_user"]').val(color);
                }
            }
        });
    });
})(jQuery);