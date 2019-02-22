///<reference path="../common/assets/types/Attribute.d.ts"/>
window.apiready = async () => {
    // console.log($api.trim("  123 "));
    const fs = api.require("fs");

    const dirPath = "fs://test";
    let isExist = false;

    await new Promise((resolve, reject) => {
        fs.exist({ path: dirPath }, (ret, err) => {
            if (err) {
                reject(new Error(JSON.stringify(err)));
            }
            const { exist, directory} = ret;

            isExist = exist && directory;

            resolve(ret);
        });
    }).then();

    console.log(isExist);

};

