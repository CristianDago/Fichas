const logger = {

  info: (message: string) => {
    console.log(`[INFO]: ${message}`);
  },

  error: (message: string, error?: any) => {
    console.error(`[ERROR]: ${message}`, error || '');
  },
  
  on: (event: string, callback: () => void) => {
    if (event === "finish") {
      setImmediate(callback); 
    }
  },
  end: () => {
  }
};

export default logger;