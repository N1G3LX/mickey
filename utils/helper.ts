// // @ts-ignore
// export const CSVToJSON = (data, delimiter = ',') => {
//     const titles = data.slice(0, data.indexOf('\n')).split(delimiter);
//     return data
//       .slice(data.indexOf('\n') + 1)
//       .split('\n')
//       .map((v: string) => {
//         const values = v.split(delimiter);
// // @ts-ignore

//         return titles.reduce(
//           (obj: { [x: string]: any; }, title: string | number, index: string | number) => ((obj[title] = values[index]), obj),
//           {}
//         );
//       });
//   };