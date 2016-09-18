interface Read<T> {
    retrieve: (callback: (error: any, result: any)=> void)=> void;
    findById: (id: string, callback: (error:any, result: T) => void) => void; 
    findOne: (cond?: Object, callback?: (err: any, res: T) => void) =>void;  
} 

export = Read;
