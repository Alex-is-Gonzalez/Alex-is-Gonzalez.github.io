document.addEventListener('DOMContentLoaded', function() {
    var runButton = document.getElementById('runButton');
    var outputContainer = document.getElementById('outputContent');
    var copyButton = document.getElementById('copyButton');
    var clearButtonT = document.getElementById('clearButton');
    var clearOutputButton = document.getElementById('clearOutputButton');
  
    var consoleLog = function(message) {
      outputContainer.innerHTML +=  message + '<br>';
    };
  
    runButton.addEventListener('click', function() {
      var terminalInput = ace.edit('terminal');
      var code = terminalInput.getValue();
      executeCode(code);
    });
  
    copyButton.addEventListener('click', function() {
      var terminalInput = ace.edit('terminal');
      copyToClipboard(terminalInput.getValue());
    });
  
    clearButtonT.addEventListener('click', function() {
      var terminalInput = ace.edit('terminal');
      terminalInput.setValue('');
      // outputContainer.innerHTML = '';
    });

    clearOutputButton.addEventListener('click', function() {
      outputContainer.innerHTML = '';
    });
   

 
  
    function executeCode(code) {
      try {
        var sandboxFn = new Function('console', code);
        sandboxFn({ log: consoleLog });
      } catch (error) {
        outputContainer.innerHTML += 'Error: ' + error + '<br>';
      }
    }
  
    function copyToClipboard(text) {
      navigator.clipboard.writeText(text)
        .then(function() {
          copyButton.innerHTML = 'Copied';
          setTimeout(function() {
            copyButton.innerHTML = 'Copy Code';
          }, 2000); // Switch back after 2 seconds
        })
        .catch(function(error) {
          console.error('Failed to copy code to clipboard:', error);
        });
    }
  
    var terminalInput = ace.edit('terminal');
    terminalInput.getSession().on('change', function() {
      var code = terminalInput.getValue();
      localStorage.setItem('terminalCode', code);
    });
  
    var savedCode = localStorage.getItem('terminalCode');
    if (savedCode) {
      terminalInput.setValue(savedCode);
      terminalInput.clearSelection();
    }
  });
  
  var editorOptions = {
    theme: 'ace/theme/monokai', // Use 'ace/theme/monokai' as the theme identifier
    mode: 'ace/mode/javascript',
    autoScrollEditorIntoView: true,
    minLines: 100,
    hasCssTransforms: true,
    wrap: true,
  };
  
  var terminalInput = ace.edit('terminal', editorOptions);
  terminalInput.wrap(true);
  
