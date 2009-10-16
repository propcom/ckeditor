// $Id$

/*
 WARNING: clear browser's cache after you modify this file.
 If you don't do this, you may notice that browser is ignoring all your changes.
 */

CKEDITOR.editorConfig = function(config) {
	config.indentClasses = [ 'rteindent1', 'rteindent2', 'rteindent3', 'rteindent4' ];

	// [ Left, Center, Right, Justified ]
	config.justifyClasses = [ 'rteleft', 'rtecenter', 'rteright', 'rtejustify' ];

	// Protect PHP code tags (<?...?>) so CKEditor will not break them when
	// switching from Source to WYSIWYG.
	// Uncommenting this line doesn't mean the user will not be able to type PHP
	// code in the source. This kind of prevention must be done in the server
	// side
	// (as does Drupal), so just leave this line as is.
	config.protectedSource.push(/<\?[\s\S]*?\?>/g); // PHP Code
	
	// This plugin adds 'LinkToMenu' button, you can include this button in toolbars that are defined below.
	config.extraPlugins = 'linktomenu';

	/*
	 Define as many toolbars as you need, you can change toolbar names
	 DrupalBasic will be forced on some smaller textareas (if enabled)
	 if you change the name of DrupalBasic, you have to update
	 CKEDITOR_FORCE_SIMPLE_TOOLBAR_NAME in ckeditor.module
	 */

	// This toolbar should work fine with "Filtered HTML" filter
	config.toolbar_DrupalFiltered = [ [ 'Source' ],
			[ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteWord' ],
			[ 'Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat' ],
			[ 'Link', 'Unlink', 'Anchor' ], [ 'Image', 'Flash', 'Table', 'Rule', 'Smiley', 'SpecialChar' ], 
			'/', 
			[ 'FontFormat' ],
			[ 'Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Subscript', 'Superscript' ],
			[ 'OrderedList', 'UnorderedList', '-', 'Outdent', 'Indent', 'Blockquote' ],
			[ 'JustifyLeft', 'JustifyCenter', 'JustifyRight', 'ShowBlocks'] ];

	config.toolbar_DrupalBasic = [ [ 'FontFormat', '-', 'Bold', 'Italic', '-', 'OrderedList', 'UnorderedList', '-', 'Link', 'Unlink', 'Image' ] ];

	/*
	 * This toolbar is dedicated to users with "Full HTML" access some of commands
	 * used here (like 'FontName') use inline styles, which unfortunately are
	 * stripped by "Filtered HTML" filter
	 */
	config.toolbar_DrupalFull = [ [ 'Source' ], [ 'Cut', 'Copy', 'Paste', 'PasteText', 'PasteWord' ],
			[ 'Undo', 'Redo', '-', 'Find', 'Replace', '-', 'SelectAll', 'RemoveFormat' ],
			[ 'Bold', 'Italic', 'Underline', 'StrikeThrough', '-', 'Subscript', 'Superscript' ],
			[ 'OrderedList', 'UnorderedList', '-', 'Outdent', 'Indent', 'Blockquote' ], 
			[ 'JustifyLeft', 'JustifyCenter', 'JustifyRight' ],
			[ 'Link', 'Unlink', 'Anchor' ], [ 'Image', 'Flash', 'Table', 'Rule', 'Smiley', 'SpecialChar' ],
			'/', 
			[ 'FontFormat', 'FontName', 'FontSize' ], [ 'TextColor', 'BGColor', 'ShowBlocks'] ];

};

CKEDITOR.plugins.addExternal('linktomenu', Drupal.settings.ckeditor.module_path + '/plugins/linktomenu/');

Drupal.settings.ckeditor.linktomenu_basepath = Drupal.settings.basePath;
