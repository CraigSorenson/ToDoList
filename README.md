# ToDo List

## Description
A simple ToDo List React application

## Authors
Craig Sorenson

## Version History
### 20240404-222x Initial Commit
Basic working todo list with ability to add and delete notes.

### 20240405-0216
* Return focus to input field
* Stored creation date in milliseconds to facilitate sorting in future
* Added ability to to mark complete.
* Code cleanup
* Export list as JSON

### 20240405-1113
* switched from crypto.randomUUID to uuidv4 due to the former not working on mobile device without a secure connection
* Import list as JSON implemented
* after creating some helper functions such as exportJSON, FileInput, et cetera, moved them to seperate Utility.jsx
* minor CSS mods but still needs heavy work

### 20240405-1800
* minor changes to card (note) display 
* CSS improvements but still needs work, looking decent on mobile
* Keep list in localstorage to persist between sessions

### 20240405-1948
* added CSS from Eric Furhmann, https://www.viget.com/articles/styling-native-file-upload-input-field/
to make the file selector look a little better.
* Look, the rest of the CSS is mostly cow pie. Ugh.
* Committing prior to switching to a merge method for loading from file

### 20240405-2330
* revamped CSS, still ugly behind the scenes but looks better up front
* removed add item button, submission by hitting 'return' good enough?
* Restore from file merges with existing list favoring current list of file list if there is an id conflict.

### 20240418_1900
* Fixed bug in MakeFileDateTime (Utility.jsx) that was assigning the numeric value for the day of the week instead of the date when naming JSON data export file.

## Todo
* Prettify load JSON functionality
* Add ability to set due date
* Look into using textarea instead of input for notes
* Show hours/days since creation
* Export list as text

## License
GNU GPLv3