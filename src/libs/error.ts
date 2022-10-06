// Check if every arguments needed are in the HTTP(s) request
const argsChecker = (args: any, ...neededArgs: any) => {
  const keys = Object.keys(args);

  for (const neededArg of neededArgs) {
    if (keys.includes(neededArg) === false) {
      return false;
    }
  }
  return true;
}

export { argsChecker };
