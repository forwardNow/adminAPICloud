declare namespace api.Require {
    interface TRequire {
        'fs': fs
    }
    enum ErrCode {
        没有错误,
        找不到文件错误,
        不可读取错误,
        编码格式错误,
        无效操作错误,
        无效修改错误,
        磁盘溢出错误,
        文件已存在错误
    }
    enum OpenType {
        read,
        write,
        read_write
    }
    interface fs {
        /**创建目录 */
        createDir(params: fs.path, callback: (ret: fs.ret, err: fs.err) => void): void

        /**删除文件目录，里面的所有文件将会一起被删除 */
        rmdir(params: fs.path, callback: (ret: fs.ret, err: fs.err) => void): void

        /*创建文件 */
        createFile(params: fs.path, callback: (ret: fs.ret, err: fs.err) => void): void

        /*删除文件 */
        remove(params: fs.path, callback: (ret: fs.ret, err: fs.err) => void): void

        /*拷贝文件 */
        copyTo(
            params: fs.oldNewPath, callback: (ret: fs.ret, err: fs.err) => void): void

        /**移动文件 */
        moveTo(
            params: fs.oldNewPath, callback: (ret: fs.ret, err: fs.err) => void): void

        /** 重命名*/
        rename(
            params: fs.oldNewPath, callback: (ret: fs.ret, err: fs.err) => void): void

        /**列出目录 */
        readDir(
            params: fs.path,
            callback: (
                ret: {
                    /**操作成功状态值 */
                    status: boolean

                    /** 文件夹内的所有子文件名称*/
                    data: []
                },
                err: fs.err
            ) => void): void

        /** 打开文件*/
        open(
            params: {
                /**目标路径 */
                path: string

                /**  描述：文件打开方式（详见文件打开方式常量）默认值 read */
                flags?: string
            }, callback: (
                ret: {
                    /** 操作成功状态值*/
                    status: boolean

                    /**操作文件的句柄 */
                    fd: string
                },
                err: fs.err
            ) => void): void

        /**读取文件 该文件句柄必须是读或读写方式打开的，否则会引起异常 */
        read(
            params: {
                /**open 方法得到的文件句柄 */
                fd: string

                /**  描述：（可选项）当前文件偏移量，以 byte 为单位 默认值：0 */
                offset?: number

                /** 描述：（可选项）读取内容长度 默认值：原文件文本内容的长度，以 byte 为单位  */
                length?: number

                /**  描述：（可选项）所要阅读的文本的编码格式，取值范围: gbk、utf8  默认值：utf8 */
                codingType?: string
            },
            callback: (
                ret: {
                    /**操作成功状态值 */
                    status: boolean

                    /**文件内容 */
                    data: string
                }, err: fs.err) => void): void

        /**从当前文件句柄当前位置向上读取一页(页的大小如 length )数据 */
        readUp(
            params: {
                /**  描述：open 方法得到的文件句柄  默认值：当前文件句柄*/
                fd?: string

                /**  描述：此次向上读取数据的长度  默认值：当前最近一次读取数据的 length，以 byte 为单位  */
                length?: number

                /**  描述：（可选项）所要阅读的文本的编码格式，取值范围: gbk、utf8 默认值：utf8 */
                codingType?: string
            },
            callback: (
                ret: {
                    /**操作成功状态值 */
                    status: boolean

                    /**文件内容 */
                    data: string
                }, err: fs.err) => void): void

        /**从当前文件句柄当前位置向下读取一页(页的大小如 length )数据 */
        readDown(
            params: {
                /**  默认值：当前文件句柄  描述：open 方法得到的文件句柄 */
                fd?: string

                /**  默认值：当前最近一次读取数据的 length，以 byte 为单位 描述：此次向上读取数据的长度  */
                length?: number

                /** 默认值：utf8   描述：（可选项）所要阅读的文本的编码格式，取值范围: gbk、utf8  */
                codingType?: string
            },
            callback: (
                ret: {
                    /**操作成功状态值 */
                    status: boolean,
                    /**文件内容 */
                    data: string
                }, err: fs.err) => void): void
        /**写入文件 */
        write(
            params: {
                /**
                 * 默认值：当前文件句柄
                 * 描述：open 方法得到的文件句柄 */
                fd: string
                /**写入数据 */
                data: string
                /**
                  * 默认值：0
                  * 描述：（可选项）当前文件偏移量，以 byte 为单位
                  */
                offset?: number
                /**
                 * 默认值：false
                 * 描述：（可选项）是否覆盖指定偏移位置后面的内容
                 */
                overwrite?: boolean
                /**
                 * 默认值：utf8
                 * 描述：（可选项）所要阅读的文本的编码格式，取值范围: gbk、utf8
                 */
                codingType?: string
            },
            callback: (ret: fs.ret, err: fs.err) => void): void

        /**关闭文件 */
        close(
            params: {
                /**open 方法得到的文件句柄 */
                fd: string
            },
            callback: (ret: fs.ret, err: fs.err) => void): void

        /**判断文件是否存在 */
        exist(
            params: fs.path,

            callback: (ret: {
                /**操作成功状态值 */
                exist: boolean

                /**文件是否是文件夹*/
                directory: boolean

            }, err: any) => void): void
        /**获取指定路径下文件的属性 */
        getAttribute(params: fs.path, callback: (ret: { status: boolean, attribute: fs.attribute }, err: fs.err) => void): void

        /**按照字符串长度读取文件，本接口针对纯文本文件有效。无需 open */
        readByLength(params: {
            /**目标文件路径，要求本地路径（fs://、widget://） */
            path: string

            /**
             * 描述：(可选项) 读取字符串范围，以字符为单位
             *默认值：见内部字段
             */
            substring?: fs.substring
        }, callback: (ret: {
            /**操作成功状态值 */
            status: boolean,

            /**读取指定文件的内容 */
            content: string,

            /**文件编码类型，取值范围： utf8、gbk */
            codingType: string
        }, err: fs.err) => void): void

        /**将字符串写入指定位置的文件，无需 open */
        writeByLength(params: {
            /**目标文件路径，要求本地路径（fs://），不支持 widget 协议 */
            path: string

            /**写入的数据 */
            content: string

            /**
             * 描述：(可选项) 写入文件位置 以字符为单位
             *默认值：见内部字段 
             */
            place?: {
                /**
                 * 非负的整数；写入文件起始位置；
                 * 默认：0 */
                start?: number,

                /**
                 * 默认：-1
                 * 取值范围:
                 * -1 (覆盖起始位置后所有)
                 * 0 (不覆盖，插入)
                 * 大于零的整数 (起始位置向后覆盖指定字符的长度)
                 */
                strategy?: number
            }

            /**
            * 默认值：utf8
            * 保存的文本的编码格式，取值范围:gbk、utf8 
            * */
            codingType: string
        }, callback: (ret: fs.ret, err: fs.err) => void): void

        /** */
        getMD5(
            /**要获取其 md5 值的文件路径 */
            params: fs.path,
            callback: (
                ret: {
                    /**操作成功状态值 */
                    status: boolean

                    /**文件的 md5 值 */
                    md5Str: string
                },
                err: any) => void
        ): void
        /**大文件切割 */
        cutFile(params: {
            /**文件路径，支持fs,widget（android不支持widget） */
            path: string

            /** 描述：切割完成保存的文件路径（不包含文件名），文件切割后的小文件会保存在此路径文件夹下，仅支持fs
             * 示例路径：‘fs://cutFiles’*/
            cutFiles: string

            /**
             * 描述：（可选项）切割后的文件单个大小；单位 MB
             * 默认：1
            */
            cutSize?: number
        }): {
            ret: {
                /**是否切割成功 */
                status: boolean,

                /**切割后的文件路径（包含文件名） */
                cutFiles: []
            }
        }

        /** */
        /**创建目录 */
        createDirSync(params: fs.path): { ret: fs.retReturn }
        /**删除文件目录，里面的所有文件将会一起被删除 */
        rmdirSync(params: fs.path): { ret: fs.retReturn }
        /*创建文件 */
        createFileSync(params: fs.path): { ret: fs.retReturn }
        /*删除文件 */
        removeSync(params: fs.path): { ret: fs.retReturn }
        /*拷贝文件 */
        copyToSync(
            params: fs.oldNewPath): { ret: fs.retReturn }
        /**移动文件 */
        moveToSync(
            params: fs.oldNewPath): { ret: fs.retReturn }
        /** 重命名*/
        renameSync(
            params: fs.oldNewPath): { ret: fs.retReturn }
        /**列出目录 */
        readDirSync(
            params: fs.path,
        ): {
            /**操作成功状态值*/
            status: boolean,
            /**错误码（详见文件操作错误码常量），仅当 status 为 false 时有值*/
            code: number,
            /**文件夹内的所有子文件名称 */
            data: []
            /**错误描述，仅当 status 为 false 时有值*/
            msg: string
        }
        /** 打开文件*/
        openSync(
            params: {
                /**目标路径 */
                path: string,
                /**
                 * 默认值 read
                 * 描述：文件打开方式（详见文件打开方式常量）
                 */
                flags?: string
            }): {
                /**操作成功状态值*/
                status: boolean,
                /**错误码（详见文件操作错误码常量），仅当 status 为 false 时有值*/
                code: number,
                /**操作文件的句柄 */
                fd: string
                /**错误描述，仅当 status 为 false 时有值*/
                msg: string
            }

        /**读取文件 该文件句柄必须是读或读写方式打开的，否则会引起异常 */
        readSync(
            params: {
                /**open 方法得到的文件句柄 */
                fd: string
                /**
                 * 默认值：0
                 * 描述：（可选项）当前文件偏移量，以 byte 为单位
                 */
                offset?: number
                /**
                 * 默认值：原文件文本内容的长度，以 byte 为单位
                 * 描述：（可选项）读取内容长度
                 */
                length?: number
                /**
                 * 默认值：utf8
                 * 描述：（可选项）所要阅读的文本的编码格式，取值范围: gbk、utf8
                 */
                codingType?: string

            }): fs.dataReturn
        /**从当前文件句柄当前位置向上读取一页(页的大小如 length )数据 */
        readUpSync(
            params: {
                /**
                 * 默认值：当前文件句柄
                 * 描述：open 方法得到的文件句柄 */
                fd?: string
                /**
                 * 默认值：当前最近一次读取数据的 length，以 byte 为单位
                 * 描述：此次向上读取数据的长度
                 */
                length?: number
                /**
                 * 默认值：utf8
                 * 描述：（可选项）所要阅读的文本的编码格式，取值范围: gbk、utf8
                 */
                codingType?: string
            }): fs.dataReturn
        /**从当前文件句柄当前位置向下读取一页(页的大小如 length )数据 */
        readDownSync(
            params: {
                /**
                 * 默认值：当前文件句柄
                 * 描述：open 方法得到的文件句柄 */
                fd?: string
                /**
                 * 默认值：当前最近一次读取数据的 length，以 byte 为单位
                 * 描述：此次向上读取数据的长度
                 */
                length?: number
                /**
                 * 默认值：utf8
                 * 描述：（可选项）所要阅读的文本的编码格式，取值范围: gbk、utf8
                 */
                codingType?: string
            }): fs.dataReturn
        /**写入文件 */
        writeSync(
            params: {
                /**
                 * 默认值：当前文件句柄
                 * 描述：open 方法得到的文件句柄 */
                fd: string
                /**写入数据 */
                data: string
                /**
                  * 默认值：0
                  * 描述：（可选项）当前文件偏移量，以 byte 为单位
                  */
                offset?: number
                /**
                 * 默认值：false
                 * 描述：（可选项）是否覆盖指定偏移位置后面的内容
                 */
                overwrite?: boolean
                /**
                 * 默认值：utf8
                 * 描述：（可选项）所要阅读的文本的编码格式，取值范围: gbk、utf8
                 */
                codingType?: string
            }): fs.retReturn

        /**关闭文件 */
        closeSync(

            params: {
                /**open 方法得到的文件句柄 */
                fd: string
            }): fs.retReturn

        /**判断文件是否存在 */
        existSync(params: fs.path): {
            /**操作成功状态值 */
            exist: boolean

            /**文件是否是文件夹*/
            directory: boolean
        }
        /**获取指定路径下文件的属性 */
        getAttributeSync(params: fs.path): {
            status: fs.ret
            attribute: fs.attribute
        }

        /**按照字符串长度读取文件，本接口针对纯文本文件有效。无需 open */
        readByLengthSync(params: {

            path: fs.path
            substring: fs.substring
        }): {
            /**操作成功状态值 */
            status: boolean,

            /**读取指定文件的内容 */
            content: string

            /**文件编码类型，取值范围： utf8、gbk */
            codingType: string

            /**错误码（详见文件操作错误码常量），仅当 status 为false 时有值  */
            code: number

            /**错误描述，仅当 status 为 false 时有值*/
            msg: string

        }

        /**将字符串写入指定位置的文件，无需 open */
        writeByLengthSync(params: {
            /**目标文件路径，要求本地路径（fs://），不支持 widget 协议 */
            path: string

            /**写入的数据 */
            content: string

            /**
             * 默认值：见内部字段
             * 描述：(可选项) 写入文件位置 以字符为单位
             */
            place?: {
                /**
                 * 非负的整数；写入文件起始位置；
                 * 默认：0 */
                start?: number,

                /**
                 * 默认：-1
                 * 取值范围:
                 * -1 (覆盖起始位置后所有)
                 * 0 (不覆盖，插入)
                 * 大于零的整数 (起始位置向后覆盖指定字符的长度)
                 */
                strategy?: number
            }

            /**
                * 默认值：utf8
                * 保存的文本的编码格式，取值范围:gbk、utf8 */
            codingType?: string
        }): fs.retReturn

        /** */
        getMD5Sync(
            /**要获取其 md5 值的文件路径 */
            params: fs.path,
        ): {
            /**操作成功状态值 */
            status: true,
            /**文件的 md5 值 */
            md5Str: string
        }
        /**大文件切割 */
        cutFileSync(params: {
            /**文件路径，支持fs,widget（android不支持widget） */
            path: string

            /** 描述：切割完成保存的文件路径（不包含文件名），文件切割后的小文件会保存在此路径文件夹下，仅支持fs
             * 示例路径：‘fs://cutFiles’*/
            cutFiles: string

            /**
             * 描述：（可选项）切割后的文件单个大小；单位 MB
             * 默认：1
            */
            cutSize?: number
        }): {
            ret: {
                /**是否切割成功 */
                status: boolean,

                /**切割后的文件路径（包含文件名） */
                cutFiles: []
            }
        }
    }


    namespace fs {
        interface oldNewPath {
            /** 源路径 */
            oldPath: string,
            /** 目标路径 */
            newPath: string
        }
        interface path {
            /**  目标路径*/
            path: string
        }
        interface ret {
            /**操作成功状态值 */
            status: boolean
        }
        interface err {
            /**错误码（详见文件操作错误码常量） */
            code: number,

            /**错误描述 */
            msg: string
        }

        /**JSON对象；文件属性 */
        interface attribute {
            /**创建日期 （时间戳），仅 iOS 支持此字段 */
            creationDate: string

            /**修改日期（时间戳） */
            modificationDate: string

            /**文件大小，以 byte 为单位 */
            size: number

            /**表示文件类型，取值范围：folder（文件夹）、file（文件） */
            type: string
        }
        interface substring {
            /**
            * 默认：0
            * 非负整数规定要提取的子串的第一个字符在文件中的位置； 
            * */
            start?: number,

            /**非负整数；所要读取的文本字符串长度；默认：原文件文本内容的总长 */
            length?: number
        }

        interface retReturn {
            /**操作成功状态值*/
            status: boolean,
            /**错误码（详见文件操作错误码常量），仅当 status 为 false 时有值*/
            code: number,
            /**错误描述，仅当 status 为 false 时有值*/
            msg: string
        }

        interface dataReturn {
            /**操作成功状态值*/
            status: boolean,
            /**错误码（详见文件操作错误码常量），仅当 status 为 false 时有值*/
            code: number,
            /**文件内容 */
            data: string
            /**错误描述，仅当 status 为 false 时有值*/
            msg: string
        }

    }

}