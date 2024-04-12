
import { LanguageData } from './FilterInputLanguage';
import { describe, it, expect } from '@jest/globals';
import { AllLanguages } from '../../Data/Languages';

describe('LanguageData', () => {
  const languages = Object.keys(LanguageData);

  
  // ! Vulnerability: The current test setup does not verify if the DOM structure matches the language data structure.
  // ! This could lead to potential issues if the DOM structure and language data structure are not in sync.
  // * That is if you have a dom structure of something like
  // * <div>
  // *  <h1>{LanguageData[language].div.h1}</h1>
  // *  <h2>{LanguageData[language].div.h2}</h2>
  // * </div>
  // * and all the languages have the same structure then the test will pass
  // * but if you do not define any one of the element in every language then the test will pass
  // * example
  // todo So always use safe operator to check if the field is present in the language data
  // export const LanguageData = {
  //   en: {
  //     div: {
  //       h1: "Test Page", // ! This is the only field defined
  //     },
  //   },
  //   hi: {
  //     div: {
  //       h1: "परीक्षण पृष्ठ", // ! This is the only field defined
  //     },
  //   },
  //   jp: {
  //     div: {
  //       h1: "テストページ", // ! This is the only field defined
  //     },
  //   },
  // };
  // ! This will pass the test but will break the application
  // todo : Add a test to check if the dom has the same fields as the language data

  languages.forEach((language) => {
    it(`contains all fields for ${language} language`, () => {
      const fields = Object.keys(LanguageData[language].div);

      languages.forEach((otherLanguage) => {
        if (otherLanguage !== language) {
          const otherFields = Object.keys(LanguageData[otherLanguage].div);
          expect(fields).toEqual(expect.arrayContaining(otherFields));
        }
      });
    });
  });

  it("contains all languages", () => {
    const languageCodes = AllLanguages.map((language) => language.code);
    expect(languages).toEqual(expect.arrayContaining(languageCodes));
  });
});