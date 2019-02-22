declare namespace api.Require {
    interface TRequire {
        'db': db
    }
    interface db {
        /**
         * 打开数据库，若数据库不存在则创建数据库。
         * 数据库打开后即使当前页面关闭了，数据库也不会关闭，除非手动调用 closeDatabase()方法关闭，所以一旦打开在其它页面就可以直接使用。
         * 若数据库放在 widget 目录下，那么需要先把数据库拷贝到 fs:// 对应目录下面再使用
         * @param params 
         * @param callback 
         */
        openDatabase(params: {
            /**数据库名称 */
            name: string
            /**（可选项）数据库所在路径，不传时使用默认创建的路径。支持 fs://、widget://等协议（如fs://user.db） */
            path?: string
        }, callback: db.CallBack): void

        /**关闭数据库 */
        closeDatabase(params: {
            /**数据库名称 */
            name: string
        }, callback: db.CallBack): void

        /**执行 sql */
        executeSql(params: {
            /**数据库名称 */
            name: string
            /**sql 语句 注意转义 */
            sql: string
        }, callback: db.CallBack): void

        /**查询sql */
        selectSql(params: {
            /**数据库名称 */
            name: string
            /**sql 语句 注意转义 */
            sql: string
        }, callback: db.dbCallBack): void

        /**
        * 打开数据库，若数据库不存在则创建数据库。
        * 数据库打开后即使当前页面关闭了，数据库也不会关闭，除非手动调用 closeDatabase()方法关闭，所以一旦打开在其它页面就可以直接使用。
        * 若数据库放在 widget 目录下，那么需要先把数据库拷贝到 fs:// 对应目录下面再使用
        * @param params 
        * @param callback 
        */
        openDatabaseSync(params: {
            /**数据库名称 */
            name: string
            /**（可选项）数据库所在路径，不传时使用默认创建的路径。支持 fs://、widget://等协议（如fs://user.db） */
            path?: string
        }): db.reterr

        /**关闭数据库 */
        closeDatabaseSync(params: {
            /**数据库名称 */
            name: string
        }): db.reterr

        /**执行 sql */
        executeSqlSync(params: {
            /**数据库名称 */
            name: string
            /**sql 语句 注意转义 */
            sql: string
        }): db.reterr

        /**查询sql */
        selectSqlSync(params: {
            /**数据库名称 */
            name: string
            /**sql 语句 注意转义 */
            sql: string
        }): db.dbCallBackSyns
    }
    namespace db {
        interface CallBack {
            (ret: ret, err: err): void
        }
        interface dbCallBack {
            (ret: ret & { data: Array<Dictionary<string | number>> }, err: err): void
        }
        interface ret {
            /**操作成功状态值 */
            status: boolean
        }
        interface err {
            /**本参数暂仅支持iOS平台 */
            code: errCode
            /**错误信息 */
            msg: string
        }
        interface reterr extends ret, err { }
        interface dbCallBackSyns extends reterr {
            data: Array<Dictionary<string | number>>
        }
        enum errCode {
            SQLITE_OK, /*Successful result */
            SQLITE_ERROR, /*SQL error or missing database */
            SQLITE_INTERNAL, /*Internal logic error in SQLite */
            SQLITE_PERM, /*Access permission denied */
            SQLITE_ABORT, /*Callback routine requested an abort */
            SQLITE_BUSY, /*The database file is locked */
            SQLITE_LOCKED, /*A table in the database is locked */
            SQLITE_NOMEM, /*A malloc() failed */
            SQLITE_READONLY, /*Attempt to write a readonly database */
            SQLITE_INTERRUPT, /*Operation terminated by sqlite3_interrupt()*/
            SQLITE_IOERR, /*Some kind of disk I/O error occurred */
            SQLITE_CORRUPT, /*The database disk image is malformed */
            SQLITE_NOTFOUND, /*Unknown opcode in sqlite3_file_control() */
            SQLITE_FULL, /*Insertion failed because database is full */
            SQLITE_CANTOPEN, /*Unable to open the database file */
            SQLITE_PROTOCOL, /*Database lock protocol error */
            SQLITE_EMPTY, /*Database is empty */
            SQLITE_SCHEMA, /*The database schema changed */
            SQLITE_TOOBIG, /*String or BLOB exceeds size limit */
            SQLITE_CONSTRAINT, /*Abort due to constraint violation */
            SQLITE_MISMATCH, /*Data type mismatch */
            SQLITE_MISUSE, /*Library used incorrectly */
            SQLITE_NOLFS, /*Uses OS features not supported on host */
            SQLITE_AUTH, /*Authorization denied */
            SQLITE_FORMAT, /*Auxiliary database format error */
            SQLITE_RANGE, /*2nd parameter to sqlite3_bind out of range */
            SQLITE_NOTADB, /*File opened that is not a database file */
            SQLITE_NOTICE, /*Notifications from sqlite3_log() */
            SQLITE_WARNING, /*Warnings from sqlite3_log() */
            SQLITE_ROW = 100, /*sqlite3_step() has another row ready */
            SQLITE_DONE = 101 /*sqlite3_step() has finished executing */
        }
    }
}