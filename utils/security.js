// Security Utilities

// Function to sanitize user input to prevent SQL injection
function sanitizeInput(input) {
  return input.replace(/\W/g, '');
}

module.exports = {
  sanitizeInput
};