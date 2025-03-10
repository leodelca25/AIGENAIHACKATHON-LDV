// Google Vision API Key (AppScriptCode)
var VISION_API_KEY = 'YOUR_GOOGLE_VISION_API_KEY';

// Google Sheets IDs (Replace with actual IDs)
var ATTRIBUTES_SHEET_ID = 'YOUR_SHEET_ID';
var FACIAL_LANDMARKS_SHEET_ID = '1EVssLZEvjYvvd4nZdWfT9RCKfUSO1PHB9EfZ4NMjOn4';
var COLORS_SHEET_ID = 'YOUR_COLORS_SHEET_ID';

// Google Drive folder for images (Replace ID)
var IMAGE_FOLDER = DriveApp.getFolderById('1Rr54ExJCycNx-HKTGIPusLtgGBtlZzgY');

// AppSheet API Keys (Required for integration)
var APPSHEET_API_KEY = 'YOUR_APPSHEET_API_KEY';
var APPSHEET_APP_ID = 'YOUR_APPSHEET_APP_ID';

// Spreadsheet Writers
var attributeWriter = SpreadsheetApp.openById(ATTRIBUTES_SHEET_ID).getSheetByName('Attributes');
var facialLandmarksWriter = SpreadsheetApp.openById(FACIAL_LANDMARKS_SHEET_ID).getSheetByName('Facial Landmarks');
var colorsWriter = SpreadsheetApp.openById(COLORS_SHEET_ID).getSheetByName('Colors');

// Extract colors from an image and save results
function detectAndSaveColors(Base64string, rowKey, createdBy) {
    var visionApiUrl = 'https://vision.googleapis.com/v1/images:annotate?key=' + VISION_API_KEY;
    var requestBody = {
        requests: [{
            image: { content: Base64string },
            features: [{ type: 'IMAGE_PROPERTIES', maxResults: 10 }]
        }]
    };
    
    var options = {
        method: 'post',
        contentType: 'application/json',
        payload: JSON.stringify(requestBody)
    };
    
    var response = UrlFetchApp.fetch(visionApiUrl, options);
    var parsedResponse = JSON.parse(response.getContentText());
    
    if (!parsedResponse.responses || parsedResponse.responses.length === 0 ||
        !parsedResponse.responses[0].imagePropertiesAnnotation?.dominantColors?.colors) {
        Logger.log("No color data found.");
        return {};
    }
    
    var colorData = [];
    parsedResponse.responses[0].imagePropertiesAnnotation.dominantColors.colors.forEach(function(colorInfo) {
        var red = colorInfo.color.red || 0;
        var green = colorInfo.color.green || 0;
        var blue = colorInfo.color.blue || 0;
        var score = colorInfo.score || 0;
        
        colorData.push({
            color: "rgb(" + Math.round(red) + ", " + Math.round(green) + ", " + Math.round(blue) + ")",
            red: Math.round(red),
            green: Math.round(green),
            blue: Math.round(blue),
            score: score
        });
        
        // Save results to Colors Sheet
        colorsWriter.appendRow([rowKey, "rgb(" + Math.round(red) + ", " + Math.round(green) + ", " + Math.round(blue) + ")", red, green, blue, score, new Date(), createdBy]);
    });
    
    Logger.log(colorData);
    return colorData;
}
