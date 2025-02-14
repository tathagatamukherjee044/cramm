const pdfjsLib = require('pdfjs-dist/build/pdf');   // Correct import!
const fs =  require('fs/promises');

async function parsePDF(pdfPath) {
  try {
    const data = await fs.readFile(pdfPath);
    const typedarray = new Uint8Array(data);
    console.log(typedarray);
    
    const loadingTask = pdfjsLib.getDocument(typedarray); // Get the loading task
    const pdf = await loadingTask.promise;
    
    const numPages = pdf.numPages;
    console.log(numPages);
    
    const questions = [];

    for (let i = 1; i <= numPages; i++) {
        console.log("page");
        
      const page = await pdf.getPage(i);
      const textContent = await page.getTextContent();

      let currentQuestion = {};
      let questionText = "";
      let options = [];
      let answer = null;
      let solution = "";
      let imageCounter = 1;
      let processingQuestion = false; // Flag to track if we're processing a question

      for (const item of textContent.items) {
        let text = item.str;

        // 1. Start of a Question
        if (text.trim().match(/^\d+\./)) { // Matches "1.", "2.", etc.
          processingQuestion = true;
          if (currentQuestion.question) {
            questions.push(currentQuestion); // Save the previous question
          }
          currentQuestion = {};
          questionText = text.replace(/^\d+\./, "").trim();
          currentQuestion.question = questionText;
          currentQuestion.options = [];
          currentQuestion.images = [];
          answer = null;
          solution = "";
        }

        // 2. Options (A, B, C, D) -  Improved matching
        else if (processingQuestion && text.trim().match(/^[A-D]\./)) {
          options.push(text.trim().substring(3).trim());
        }

        // 3. Answer - Handles variations and extracts the letter
        else if (processingQuestion && (text.trim().startsWith("Ans.") || text.trim().startsWith("Answer:"))) {
          answer = text.trim().substring(4).trim().toUpperCase().replace(".", "");
        }

        // 4. Solution - Allows for multi-line solutions
        else if (processingQuestion && (text.trim().startsWith("Sol.") || text.trim().startsWith("Solution:") || text.trim().startsWith("Explanation:"))) {
          solution = text.trim().substring(4).trim();
        } else if (processingQuestion && item.type === "image") {
          const imageName = `image_${i}_${imageCounter++}`;
          currentQuestion.images.push(`url/subject/${imageName}`);
          // Image extraction would go here
        }

        // 5. Multiline Question Text - Continues if still within the question block
        else if (processingQuestion && currentQuestion.question && options.length < 4) {
          questionText += " " + text.trim();
          currentQuestion.question = questionText;
        }

        // 6. Multiline Solution Text - Continues until the next question
        else if (processingQuestion && currentQuestion.question && solution === "") {
          solution += text.trim();
        }
      }

      // Save the last question of the page
      if (currentQuestion.question) {
        currentQuestion.options = options;
        currentQuestion.answer = answer;
        currentQuestion.solution = solution;
        questions.push(currentQuestion);
      }
    }

    return JSON.stringify(questions, null, 2);

  } catch (error) {
    console.error('Error parsing PDF:', error);
    return null;
  }
}

const pdfFilePath = '../resources/miniPDF.pdf'; // Use the correct file name

parsePDF(pdfFilePath)
  .then(jsonOutput => {
    if (jsonOutput) {
      fs.writeFile('output.json', jsonOutput, err => {
        if (err) {
          console.error(err);
        }
        // file written successfully
      });
      console.log(jsonOutput);
    }
  });