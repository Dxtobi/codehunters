
interface CodeBlockProps {
    theme: 'dark' | 'light';
    code: string;
    language: string;
  }

  
export function CodeBlock({ theme, code, language }: CodeBlockProps) {
    const themes: Record<string, string> = {
      light: '',
      dark: '',
      // add more themes as needed
    };

    // Set the CSS styles for each theme
  if (themes.light === '') {
    themes.light = `
      #code-block {
        background-color: #f5f5f5;
      }
    `;
  }

  if (themes.dark === '') {
    themes.dark = `
      #code-block {
        background-color: #282c34;
      }
    `;
    }
    

    // Select the appropriate theme
    const selectedTheme = themes[theme] || themes.light;
    
    

  return `<div id='code-block'><style>${selectedTheme}</style><pre><code dangerouslySetInnerHTML={{ __html: ${code} }} /></pre></div>`
  
}