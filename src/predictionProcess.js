// https://github.com/mljs/knn
import KNN from "./core/knnClassifier.js";
import {train_dataset, train_labels} from "./utils/coffeeTeaMeta.js";

const knn = new KNN(train_dataset, train_labels, { k: 2 }); // consider 2 nearest neighbors
export const fillAndPredictByOne = (metaObj, inputData) => {
  if (
    !(
      Array.isArray(inputData) &&
      inputData.length === Object.keys(metaObj).length
    )
  )
    return "Invalid data provided";
  const metaObjCopy = structuredClone(metaObj);
  const keys = Object.keys(metaObjCopy);
  for (let i = 0; i < inputData.length; i++)
    metaObjCopy[keys[i]].push(inputData[i]);
  const predictDataset = [].concat(...Object.values(metaObjCopy));
  /** Prediction process initiation */
  return predict(predictDataset);
};

export const fillAndPredictByMany = (metaObj, inputArray) => {
  if (!(Array.isArray(inputArray) && inputArray.every((v) => Array.isArray(v))))
    return "Wrong data type provided";
  const resArr = [];
  for (let arr of inputArray) resArr.push(fillAndPredictByOne(metaObj, arr));
  return resArr;
};

const predict = (dataset) => {
  if (!Array.isArray(dataset)) return "Wrong data type provided";
  return knn.predict(dataset);
}