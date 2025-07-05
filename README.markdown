# Hex to Text Converter Chrome Extension

## Overview
This Chrome extension allows users to convert hexadecimal strings into plain text. It provides a simple interface to input hex strings, view the decoded text, copy results, save them to a history, and open valid URLs directly from the results. The extension also includes a history page to view previously saved conversions.

## Features
- **Hex to Text Conversion**: Converts hex strings to UTF-8 text.
- **Copy Results**: Easily copy the decoded text to the clipboard.
- **Save to History**: Store converted text in Chrome's local storage for later reference.
- **Open URLs**: If the decoded text is a valid URL, open it in a new tab.
- **View History**: Access a history page to see all saved conversions.
- **Clear History**: Option to clear the saved history.

## Installation
1. Clone or download this repository to your local machine.
2. Open Google Chrome and navigate to `chrome://extensions/`.
3. Enable **Developer mode** in the top-right corner.
4. Click **Load unpacked** and select the folder containing the extension files.
5. The extension will appear in your Chrome toolbar.

## Usage
1. Click the extension icon in the Chrome toolbar to open the popup.
2. Enter a hexadecimal string in the input field.
3. Click **Convert** to decode the hex string into text.
4. Use the **Copy Result** button to copy the decoded text.
5. If the result is a valid URL, an **Open Link** button will appear to open it in a new tab.
6. Click **Save** to store the result in the history.
7. Click **View History** to open the history page and see all saved conversions.
8. On the history page, click **Clear All History** to remove all saved entries.

## Files
- `manifest.json`: Defines the extension's configuration, permissions, and resources.
- `popup.html`: The main popup interface for hex input and conversion.
- `popup.js`: Handles the conversion logic, clipboard operations, and history saving.
- `history.html`: Displays the saved conversion history.
- `history.js`: Manages the history page, including loading and clearing history.
- `utils.js`: Contains utility functions, such as URL validation.
- `icon.png`: The extension's icon (16x16 pixels).

## Permissions
The extension requires the following permissions:
- `clipboardWrite`: To copy results to the clipboard.
- `scripting`: To execute scripts in the extension.
- `storage`: To save and retrieve history data.
- `tabs`: To open URLs in new tabs.
- `host_permissions: ["<all_urls>"]`: To allow opening any valid URL.

## Notes
- The hex string must have an even number of characters to be valid.
- The decoded text must be UTF-8 compatible; otherwise, an error is displayed.
- The history is stored locally using Chrome's `storage.local` API and persists until cleared.
- Ensure the `utils.js` file is loaded correctly for URL validation to work.

## Contributing
Contributions are welcome! Please fork the repository, make your changes, and submit a pull request. Ensure your code follows the existing structure and includes appropriate comments.

## License
This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for details.

## Contact
For questions or feedback, please open an issue on this repository.