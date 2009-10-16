$Id$

CONTENTS OF THIS FILE
---------------------

 * Overview
 * Required components
 * More information and licence
 * Requirements
 * Configuration
 * Installation troubleshooting
 * Plugins: Teaser break and Pagebreak
 * Uploading images and files
 * How to enable the built-in file browser
 * Modules: Image Assist
 * Modules: Link to content (EXPERIMENTAL)
 * Upgrading instructions
 * Help & Contribution
 * Credits

Overview
--------
This module allows Drupal to replace textarea fields with the
CKEditor.
This HTML text editor brings many of the powerful functions of known
desktop editors like Word to the web. It's relatively lightweight and
doesn't require any kind of installation on the client computer.

Required components
-------------------
To use CKEditor in Drupal, you will need to download the CKEditor
http://ckeditor.com/

More information and licence
----------------------------
CKEditor - The text editor for internet
Copyright (C) 2003-2008 Frederico Caldeira Knabben

Licensed under the terms of the GNU Lesser General Public License:
    http://www.opensource.org/licenses/lgpl-license.php

For further information visit:
    http://ckeditor.com/
    http://drupal.ckeditor.com

Requirements
------------
  - Drupal 6.x
  - PHP 4.3.0 or greater
  - CKEditor 2.5.x or greater (http://ckeditor.com/)

Configuration
-------------------
Note: this instruction assumes that you install CKEditor in
      sites/all/modules directory (recommended).

   1. Unzip the files in the sites/all/modules directory. It should now
      contain a ckeditor directory.
   2. Download CKEditor from http://ckeditor.com/download. Unzip the
      contents of the ckeditor directory in the
      sites/all/modules/ckeditor/ckeditor directory.
   3. Enable the module as usual from Drupal's admin pages.
   4. Grant permissions for use of CKEditor in
      "Administer > User Management > Permissions"
      Note: to enable the file browser, read also the
            "How to enable the file browser" section.
   5. Under "Administer > Site configuration > CKEditor", adjust
      the ckeditor profiles. In each profile you can choose which textareas
      will be replaced by CKEditor, select default toolbar and configure
      some more advanced settings.
   6. For the Rich Text Editing to work you also need to configure your filters
      for the users that may access Rich Text Editing.
      Either grant those users Full HTML access or use the following tags:
      <a> <p> <span> <div> <h1> <h2> <h3> <h4> <h5> <h6> <img> <map> <area> <hr>
      <br> <br /> <ul> <ol> <li> <dl> <dt> <dd> <table> <tr> <td> <em> <b> <u> <i> <strong>
      <font> <del> <ins> <sub> <sup> <quote> <blockquote> <pre> <address> <code>
      <cite> <embed> <object> <param> <strike> <caption>.
   7. To have a better control over line breaks, you may disable Line break converter
      in the chosen filter (recommended).
   8. Modify the ckeditor.config.js file to custom your needs (optional).
      You may copy the needed configuration lines from the default CKEditor
      configuration settings (sites/all/modules/ckeditor/ckeditor/fckconfig.js),
      the lines in ckeditor.config.js will override most settings.
      In ckeditor.config.js you may define your own toolbars with selected buttons.
      WARNING: clear browser's cache after you modify any of the javascript files.
      If you don't do this, you may notice that browser is ignoring all your changes.


Installation troubleshooting
----------------------------
If your CKEditor does not show you must check if all files are
extracted correctly.
The directory sites/all/modules/ckeditor/ckeditor/ should have the
following files:
   - ckeditor.js
   - fckconfig.js
   - fckstyles.xml
   - fcktemplates.xml
   - ckeditor.php
   - ckeditor_php4.php
   - ckeditor_php5.php
and a directory named editor.

The correct directory structure is as follows:
    modules
       ckeditor
          ckeditor.module
          ckeditor
             _samples
             editor
             COPY_HERE.txt
             fckconfig.js
             ...

If you're still having problems, scroll down to the "Help & Contribution" section.

Plugins: Teaser break and Pagebreak
-----------------------------------
By default, CKEditor module comes with two plugins that can handle
teaser break (<!--break-->) and pagebreak (<!--pagebreak-->).
You can enable any (or even both) of them.

   1. Open sites/all/modules/ckeditor/ckeditor.config.js and
      uncomment these three lines:

            FCKConfig.PluginsPath = '../../plugins/' ;
            FCKConfig.Plugins.Add( 'drupalbreak' ) ;
            FCKConfig.Plugins.Add( 'drupalpagebreak' ) ;


   2. The second step is to add buttons to the toolbar (in the same file).
      The button names are: DrupalBreak, DrupalPageBreak.
      For example if you have a toolbar with an array of buttons defined
      as follows:

      ['Image','Flash','Table','Rule','SpecialChar']

      simply add those two buttons at the end of array:

      ['Image','Flash','Table','Rule','SpecialChar', 'DrupalBreak', 'DrupalPageBreak']

      (remember about single quotes).
      
    3. Note that the <!--pagebreak--> tag is not supported by default in Drupal.
       You should install the Paging module: http://drupal.org/project/paging
       to enable the <!--pagebreak--> tag support. Please refer to the Paging
       module documentation for detailed installation instructions.

Uploading images and files
--------------------------

There are three ways of uploading files: By using the built-in file browser, 
by using modules like IMCE, Image Browser or by using the core upload module.

How to enable the built-in file browser
------------------------------
The editor gives the end user the flexibility to create a custom file browser
that can be integrated on it.
The included file browser allows users to view the content of a specific
directory on the server and add new content to that directory
(create folders and upload files).

   1. To enable file browsing you need to edit the connector configuration file
      in your ckeditor module directory, the file should be in:

          sites/all/modules/ckeditor/ckeditor/editor/filemanager/connectors/php/config.php

      In this file(s) you will need to enable the file browser by adding one
      line that includes file with the special authentication function for
      Drupal (filemanager.config.php). Add this code:

          require_once '../../../../../filemanager.config.php';

      straight below this line:

          $Config['UserFilesAbsolutePath'] = '' ;

      The config.php file also holds some other important settings, please
      take a look at it and adjust it to your needs (optional).

   2. Locate file named settings.php inside your drupal directory
      (usually sites/default/settings.php) and set $cookie_domain variable to the
      appropriate domain (remember to uncomment that line). If you not do this,
      CKEditor will claim that file browser is disabled

   3. Enabling file uploads is a security risk. That's why you have to grant a
      separate permission to enable the file browser to certain groups.
      In "Administer > User Management > Permissions" assign the
      "allow ckeditor file uploads" permissions.

   4. Lastly, adjust the File browser settings for each profile: set "File browser type" to "Built-in filebrowser".

Modules: Image Assist
---------------------
Image Assist version 1 and 2 can be integrated with CKEditor. It is no longer necessary to copy a Javascript file.

Modules: Link to content (EXPERIMENTAL)
---------------------------------------
Link to content module can be integrated with CKEditor.
ATTENTION: this module is not yet compatible with CKEditor :(

The unofficial version of Link to content module compatible with CKEditor can be downloaded here:
     http://drupal.fckeditor.net/download/linktocontent-ckeditor-6.x-2.x-dev.zip

Installation:
Follow the instruction from INSTALL.txt attached to the linktocontent module.
Then do the following steps to add Linktocontent button to the CKEditor toolbar:

By default, CKEditor module comes with two plugins that allows you to use linktocontent and linktonode features.
You can enable any (or even both) of them.

   1. Open /drupal/modules/ckeditor/ckeditor.config.js and uncomment these three lines:

            FCKConfig.PluginsPath = '../../plugins/' ;
            FCKConfig.Plugins.Add( 'linktonode', 'en,pl' ) ;
            FCKConfig.Plugins.Add( 'linktomenu', 'en,pl' ) ;

   2. The second step is to add buttons to the toolbar (in the same file).
      The button names are: LinkToNode, LinkToMenu. 
      For example if you have a toolbar with an array of buttons defined as follows:

      ['Link','Unlink','Anchor']

      simply add those two buttons at the end of array (or somewhere in the middle):

      ['Link','Unlink','LinkToNode','LinkToMenu','Anchor']

      (remember about single quotes).


Upgrading instructions
----------------------
This instruction assumes that you are upgrading CKEditor module [M] and CKEditor (the editor)[E] at the same time. 
Instructions specific for module upgrades are tagged with [M], steps that must be taken when upgrading CKEditor (the editor) are marked with [E].

   1. [M] Download the latest version of CKEditor module from http://drupal.org/project/ckeditor (it is advised to read release notes before going further).
   2. [E] Download the latest version of CKEditor from http://ckeditor.com/download (it is advised to read "what's new" before going further: http://ckeditor.com/whatsnew).
   3. [M] Back up your database.
   4. [EM] Place the site in "Off-line" mode, to let the database updates run without interruption and avoid displaying errors to end users of the site.
   5. [E] If you have used the CKEditor built-in file browser, make a backup of sites/all/modules/ckeditor/ckeditor/editor/filemanager/connectors/php/config.php
   6. [E] If you have configured spellchecker, make a backup of sites/all/modules/ckeditor/ckeditor/editor/dialog/fck_spellerpages/spellerpages/server-scripts/spellchecker.php
   7. [E] If you have made any changes inside of sites/all/modules/ckeditor/ckeditor.config.js (or sites/all/modules/ckeditor/ckeditor/fckconfig.js), write down your changes and add them again after uploading new files (e.g. own toolbar definitions, re-enable a plugin etc.). Try to not make any changes to fckconfig.js and add everything to ckeditor.config.js.
   8. Delete old files:
      [EM]* Simply remove modules/ckeditor directory if upgrading both, the editor and the module. 
      [M] If you are upgrading module only, remember to leave the modules/ckeditor/ckeditor directory. 
      [E] When upgrading the editor, remove contents of modules/ckeditor/ckeditor directory only.
      WARNING: if you don't remove old files and just rename ckeditor directory instead e.g. to ckeditor_old, Drupal may use module from the ckeditor_old directory.
   9. [M] Upload CKEditor module (extracted files and folders) to sites/all/modules directory.
   10. [E] Upload CKEditor (extracted files and folders from the ckeditor directory) to sites/modules/ckeditor/ckeditor (i.e. where COPY HERE.txt file exists)
   11. [E] Replace the new config.php (see step 5) file with the old one (or RECOMMENDED way: perform again step with adding require_once '../../../../../filemanager.config.php'; to config.php)
   12. [E] Replace the new spellchecker.php with the old one (see step 6) (or RECOMMENDED way: configure new spellchecker.php following the settings from the old file).
   13. [E] Apply your modifications to default configuration in ckeditor.config.js file (see step 7).
   14. [M] If you're using Image Assist module, copy the new img_assist_ckeditor.js to modules/img_assist folder.
   15. [M] Run update.php.
   16. [EM] Put the site back online.
   
Help & Contribution
-------------------
If you are looking for more information, have any troubles in configuration or if
you found an issue, please visit the official project page:
  http://drupal.org/project/ckeditor

Having problems? Take a look at list of common problems when installing CKEditor:
  http://drupal.ckeditor.com/troubleshooting

How to tune up CKEditor to your theme and configure spell checker:
  http://drupal.ckeditor.com/tricks

We would like to encourage you to join our team if you can help in any way.
If you can translate CKEditor module, please use ckeditor.pot file as a template
(located in "translations" directory) and send us the translated file so that we could attach it.
Any help is appreciated.

Credits
-------
 - CKEditor for Drupal Core functionality originally written by:
     Frederico Caldeira Knabben
     Jorge Tite (LatPro Inc.)

 - CKEditor for Drupal 5.x originally written by:
     Ontwerpwerk (www.ontwerpwerk.nl)

 - CKEditor for Drupal 6.x is currently maintained by CKEditor team and Jorrit Schippers.
     http://ckeditor.com/

 - CKEditor - The text editor for internet
     Copyright (C) 2003-2008 Frederico Caldeira Knabben
     http://ckeditor.com/
