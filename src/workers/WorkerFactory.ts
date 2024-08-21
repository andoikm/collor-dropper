export default function WorkerFactory(workerCb: Function): Worker {
  const workerCallback = workerCb.toString();
  const workerBlob = new Blob([`(${workerCallback})()`], {
    type: 'application/javascript',
  });
  return new Worker(URL.createObjectURL(workerBlob));
}