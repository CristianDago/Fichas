export const isValueTrulyEmpty = (val: any): boolean => {
    return (
      val === null ||
      val === undefined ||
      (typeof val === "string" && val.trim() === "") ||
      (typeof val === "number" && isNaN(val))
    );
  };