import * as sass from 'sass';

export const compileSass = async (scssInput: string): Promise<string> => {
  try {
    const result = sass.compileString(scssInput);
    return result.css;
  } catch (error) {
    console.error('SCSS compilation error:', error);
    throw new Error('Invalid SCSS input');
  }
};

export const cssToScss = (cssInput: string): string => {
  // This is a basic conversion and doesn't handle all CSS cases
  // For a production app, consider using a more robust CSS parser
  const lines = cssInput.split('\n');
  let scssOutput = '';
  let indentLevel = 0;

  for (let line of lines) {
    line = line.trim();
    if (line.endsWith('{')) {
      scssOutput += '  '.repeat(indentLevel) + line + '\n';
      indentLevel++;
    } else if (line === '}') {
      indentLevel--;
      scssOutput += '  '.repeat(indentLevel) + line + '\n';
    } else if (line.includes(':')) {
      scssOutput += '  '.repeat(indentLevel) + line + '\n';
    }
  }

  return scssOutput;
};