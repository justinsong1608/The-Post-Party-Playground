 // This function adds different colors for each individual letter in a word. //

export default function ColorTitle({ word }) {
  const titleWithSpace = word.split('');
  const title = titleWithSpace.filter(function (str) {
    return /\S/.test(str);
  });

  let fixedKey = 0; //This is when I add back the spaces. The spaces need keys that are unique.//
  const titleWithColor = title.map((letter, index) => {
    fixedKey++;
    return (<span key={index} className={`darumadrop-${index % 7 + 1}`}>{letter}</span>);
  });

  // Add spaces back to the title
  for (let i = 0; i < titleWithSpace.length; i++) {
    if (titleWithSpace[i] === ' ') {
      titleWithColor.splice(i, 0, <span key={fixedKey}> </span>); //fixedKey is a unique number that increments from the previous key //
      fixedKey++;
    }
  }

  return (<>{titleWithColor}</>);
}
