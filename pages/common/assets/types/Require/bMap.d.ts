declare namespace api.Require {
    interface TRequire {
        "bMap": bMap
    }

    interface bMap {
        /**初始化百度地图引擎，本接口仅支持 iOS 平台，android平台不需要初始化 */
        initMapSDK(callback: (ret: bMap.ret, err: bMap.initMapSDKCode) => void): void

        /**打开百度地图 */
        open(callback: (ret: bMap.ret, err: any) => void): void
        open(params: bMap.open, callback: (ret: bMap.ret, err: any) => void): void

        /**定制地图主题，需要在open接口调用前调用 */
        customStyle(params: bMap.customStyle): void

        /**打开/关闭定制主题，需要在open接口调用后才生效 */
        enableCustom(params: {
            /**
             * 描述：（可选项）是否打开定制主题
             * 默认：true
             */
            enable?: boolean
        }): void

        /**关闭百度地图 */
        close(): void

        /**显示百度地图 */
        show(): void

        /**隐藏百度地图 */
        hide(): void

        /**重设地图的显示区域 */
        setRect(params: bMap.rect): void

        /**开始定位，若要支持后台定位需配置 config.xml 文件 location 字段，无需调用 open 接口即可定位。在 android 平台上，离线定位功能需要手动打开GPS，并在无遮挡物的室外 */
        getLocation(params: bMap.getLocation, callback: (ret: bMap.getLocationRet, err: {
            /**错误码 */
            code: number

            /**错误信息说明 */
            msg: string
        }) => void): void

        /**停止定位 */
        stopLocation(): void

        /**获取定位是否开启，及当前 app 获取的定位权限 */
        getLocationServices(callback: (ret: {
            /**
             * 当前设备定位功能是否开启，true|false；在Android 平台上本参数表示当前app定位功能是否可用；在iOS 平台上本参数表示当前设备定位功能是否可用，若判断当前app的定位功能，可用authorizationStatus识别。
             */
            enable: boolean

            /**
             * 当前 App 获取的定位权限，Android 平台无此参数。
             * 取值范围:
             * notDetermined:用户从未选择过权限
             * restricted:未授权，且用户无法更新，如家长控制情况下
             * denied:用户拒绝该应用使用定位服务
             * always:总是使用
             * whenInUse:按需使用
             */
            authorizationStatus: "notDetermined" | "restricted" | "denied" | "always" | "whenInUse"
        }, err: any) => void): void

        /**根据地址查找经纬度，无需调用 open 接口即可使用 */
        getCoordsFromName(params: {
            /**描述：（可选项）地址所在城市 */
            city?: string

            /**描述：地址信息 */
            address: string
        }, callback: (ret: bMap.getCoordsFromNameRet, err: bMap.code) => void): void

        /**根据经纬度查找地址信息，无需调用 open 接口即可使用 */
        getNameFromCoords(params: bMap.lonlat, callback: (ret: bMap.getNameFromCoords, err: bMap.code) => void): void

        /**获取地图两点之间的距离，无需调用 open 接口即可使用 */
        getDistance(params: {
            /**描述：起点经纬度 */
            start: bMap.lonlat

            /**描述：终点经纬度 */
            end: bMap.lonlat
        }, callback: (ret: {
            /**状态 */
            status: boolean,

            /**两点之间的距离，单位：米 */
            distance: number
        }, err: any) => void): void

        /**是否在地图上显示用户位置，会自动移动地图可视区域中心点到用户当前坐标位置，自带地图移动动画效果 */
        showUserLocation(): void
        showUserLocation(params: bMap.showUserLocation): void

        /**根据经纬度设置百度地图中心点，此接口可带动画效果 */
        setCenter(params: {
            /**描述：中心点的经纬度 */
            coords: bMap.lonlat

            /**
             * 描述：（可选项）设置地图的中心点时，是否带动画效果
             * 默认：true
             */
            animation?: boolean
        }): void

        /**获取百度地图中心点坐标 */
        getCenter(callback: (ret: bMap.lonlat) => void): void

        /**设置百度地图缩放等级，此接口自带动画效果 */
        setZoomLevel(params: {
            /**
             * 描述：（可选项）地图比例尺级别，取值范围：3-18级
             * 默认值：10
             */
            level?: number
        }): void

        /**获取百度地图比例尺级别，取值范围：3-18级 */
        getZoomLevel(callback: (ret: {
            /**描述：地图比例尺级别，取值范围：3-18级*/
            level: number
        }, err: any) => void): void

        /**设置最大缩放比例，取值范围：3-18级 */
        setMaxAndMinZoomLevel(): void
        setMaxAndMinZoomLevel(params: {
            /**
             * 描述：（可选项）设置的最大缩放比例
             * 默认：15
             *  */
            maxLevel?: number

            /**
             * 描述：可选项）设置的最小缩放比例
             * 默认：10
             *  */
            minLevel?: number
        }): void

        /**设定地图是否显示底图 poi 标注(不包含室内图标注) */
        setShowMapPoi(): void
        setShowMapPoi(params: {
            /**
             * 描述：可选项）是否显示地图 poi
             * 默认：15
             *  */
            showMapPoi?: boolean
        }): void

        /**获取地图是否显示底图 poi 标注(不包含室内图标注)，Android系统（不支持） */
        getShowMapPoi(callback: (ret: {
            /**描述：是否显示地图 poi*/
            showMapPoi: boolean
        }, err: any) => void): void

        /**设置百度地图相关属性 */
        setMapAttr(params: bMap.setMapAttr): void

        /**设置百度地图旋转角度，此接口自带动画效果 */
        setRotation(params: {
            /**
             * 描述：（可选项）地图旋转角度，取值范围：-180° - 180°
             * 默认值：0
             */
            degree?: number
        }): void

        /**设置百度地图俯视角度，此接口自带动画效果*/
        setRotation(params: {
            /**
             * 描述：（（可选项）地图俯视角度，取值范围：-45° - 0°
             * 默认值：0
             */
            degree?: number
        }): void

        /**设置百度地图比例尺 */
        setScaleBar(params: {
            /**
             * 描述：（可选项）是否显示比例尺
             * 默认值：false
             */
            show?: boolean

            position?: {
                /**
                 * （可选项）数字类型；比例尺左上角的 x 坐标（相对于地图）；
                 * 默认：0 */
                x?: number,

                /**
                 * （可选项）数字类型；比例尺左上角的 y 坐标（相对于地图）；
                 * 默认：0 */
                y?: number
            }
        }): void

        /**设置百度地图指南针位置，只有地图旋转或视角变化时才显示指南针 注:android默认会在地图旋转的时候显示指南针，不支持自定义位置 */
        setCompass(params: {

            /**（可选项）指南针的位置，设定坐标以地图左上角为原点 */
            position?: {
                /**
                 * 指南针中心点的 x 坐标（相对于地图）
                 * 默认：指南针宽度/2.0
                 */
                x?: number,

                /**
                 * 指南针中心点的 y 坐标（相对于地图）
                 * 默认：指南针高度/2.0
                 */
                y?: number
            }
        }): void

        /**设置百度地图交通路况 */
        setTraffic(params: {
            /**
             * 描述：（可选项）是否显示交通路况
             * 默认值：true
             */
            traffic?: boolean
        }): void

        /**设置百度地图城市热力图 */
        setHeatMap(params: {
            /**
             * 描述：（可选项）是否显示城市热力图
             * 默认值：true
             */
            heatMap?: boolean
        }): void

        /**设定地图是否现实 3D 楼块效果，地图放大，才会有 3D 楼快效果，倾斜视角 3D 效果会更明显 */
        setBuilding(params: {
            /**
             * 描述：（可选项）是否现实3D楼块效果
             * 默认值：true
             */
            building?: boolean
        }): void

        /**设置地图显示范围（矩形区域），此接口可带动画效果*/
        setRegion(params: bMap.setRegion): void

        /**获取地图显示范围（矩形区域） */
        getRegion(callback: (ret: bMap.getRegion, err: any) => void): void

        /**将其它类型的地理坐标转换为百度坐标。无需调用 open 接口即可使用 */
        transCoords(params: bMap.transCoords, callback: (ret: bMap.transCoordsRet, err: {
            /**错误码
             * 1：（参数非法）
             * 2：（转换失败）
             */
            code: number
        }) => void): void

        /**缩小地图，放大视角，放大一级比例尺，此接口自带动画效果 */
        zoomIn(): void

        /**放大地图，缩小视角，缩小一级比例尺，此接口自带动画效果 */
        zoomOut(): void

        /** */
        addEventListener(params: bMap.addEventListener, callback: (ret: bMap.addEventListenerRet, err: any) => void): void

        /**判断已知点是否在指定的多边形区域内 */
        isPolygonContantsPoint(params: {
            /**已知点的地理坐标*/
            point: bMap.lonlat

            /**多边形的各个点组成的数组 */
            points: Array<bMap.lonlat>
        }, callback: (ret: bMap.ret, err: any) => void): void

        /**停止监听地图相关事件 */
        removeEventListener(params: bMap.addEventListener): void

        /**开始搜索GPS信息（卫星个数，以及每个卫星的信噪比数组），本接口仅支持 android 平台 */
        startSearchGPS(callback: (ret: bMap.startSearchGPSRet, err: any) => void): void

        /**停止搜索GPS信息，本接口仅支持 android 平台 */
        stopSearchGPS(): void

        /**获取当前定位，需调用 open 接口，且showUserLocation为true时，才可定位。 */
        getCurrentLocation(callback: (ret: bMap.getCurrentLocation, err: {
            /**错误信息  1尚未定位成功 -1未知错误*/
            code: 1 | -1
        }) => void): void

        /**
         * 打开关闭室内地图
         * 注意:
         * 1.因路况、卫星图和城市热力图，仅支持20级地图数据显示，室内地图放大到22级，打开路况、卫星图或城市热力图，无相应数据显示。
         * 2.室内图默认是关闭的，通过本接口打开
         *  */
        setIndoorMap(params: {
            /**
             * 描述：（可选项）是否打开室内地图
             * 默认值：true
             */
            draggable?: boolean
        }): void

        /**添加进出室内地图的监听 */
        addIndoorListener(callback: (ret: bMap.addIndoorListener, err: any) => void): void

        switchIndoorMapFloor(params: bMap.strIDStrFloor, callback: (ret: bMap.ret, err: {
            /**
             *错误码 
             * 1:切换楼层失败
             * 2:地图还未聚焦到传入的室内图
             * 3:当前室内图不存在该楼层
             */
            code: 1 | 2 | 3
        }) => void): void

        /**搜索室内地图内容 */
        indoorSearch(params: bMap.indoorSearch, callback: (ret: bMap.indoorSearchRet, err: bMap.indoorSearchErr) => void): void

        /**在地图上添加标注信息 */
        addAnnotations(params: bMap.addAnnotations, callback: (ret: bMap.addEventListenerRet, err: any) => void): void

        /**获取指定标注的经纬度 */
        getAnnotationCoords(params: bMap.id, callback: (ret: bMap.lonlat, err: any) => void): void

        /**设置某个已添加标注的经纬度 */
        setAnnotationCoords(params: bMap.setAnnotationCoords): void

        /**判断标注是否存在 */
        annotationExist(params: bMap.id, callback: (ret: bMap.ret, err: any) => void): void

        /**设置点击标注时弹出的气泡信息 */
        setBubble(params: bMap.setBubble, callback: (ret: bMap.setBubbleRet, err: any) => void): void

        /**弹出指定标注的气泡 */
        popupBubble(params: bMap.id): void

        /**关闭已弹出的气泡 */
        closeBubble(params: bMap.id): void

        /**在地图上添加布告牌 */
        addBillboard(params: bMap.addBillboard): void

        /**在地图上添加可移动、旋转的标注图标，注意：本 id 不可与 addAnnotations、addBillboard 接口内的 id 相同 */
        addMobileAnnotations(params: {
            annotations: [{
                /**图标标注的唯一标识 */
                id: number

                /**图标标注所在位置的经度 */
                lon: number

                /**图标标注所在位置的纬度 */
                lat: number

                /**指定的标注图标，要求本地路径（fs://、widget://），若不传则显示公用的 icon 图标 */
                icon?: string
            }]
        }): void

        /**移动地图上已添加的可移动、旋转的标注图标，在移动动画开始前，会先做 0.3 秒的旋转动画，使所移动的图标中间轴线顶端对准终点坐标点。由于百度官方 SDK 的 bug 限制，在 Android 平台上，如果标注添加到地图当前可视区域以外的区域，则不可以移动该标注 */
        moveAnnotation(params: {
            /**要移动的标注的 id */
            id: number

            /**
             * 描述：（可选项）标注图标移动动画的时间，单位为秒（s），不包括旋转动画时间
             * 默认值：1.0（s）
             */
            duration?: number

            /**终点经纬度 */
            end: bMap.lonlat
        }, callback: (
            /**终点的经纬度 */
            ret: bMap.id,
            err: any) => void): void

        /**移除指定 id 的标注（可移动、不可移动）或布告牌 */
        removeAnnotations(params:
            /**（可选项）要移除的标注或布告牌id（数字），若不传或传空则移除所有addAnnotations、addBillboard、addMobileAnnotations接口添加的标注 */
            bMap.ids
        ): void

        /**往地图上添加聚合点
         * 显示逻辑：
         * 可以添加多个点到地图上。缩放地图时，会自动根据当前显示区域，将多个点聚合成一个点显示在地图上，并显示该点包含多少个聚合点。聚合点无点击相应事件，单个点才有（通过addClusterListener接口监听）。聚合点及单个点的样式可通过 styles 参数控制。比如：在天安门广场添加了20个聚合点，当地图缩小到当前屏幕显示五环以内的北京时，天安门广场位置只显示一个点，点的标题显示为数字20。当地图放大到当前屏幕只显示天安门广场时才显示单个点，可以通过 addClusterListener 接口监听其单击事件。
         */
        addCluster(params: bMap.addClusterStyles): void

        /**设置点击标注时弹出的气泡信息 */
        setWebBubble(params: bMap.setWebBubble): void

        /**添加网页气泡点击监听 */
        addWebBubbleListener(callback: (ret: bMap.id, err: any) => void): void

        /**移除网页气泡点击监听 */
        removeWebBubbleListener(callback: (ret: void, err: any) => void): void

        /**移除本次添加的聚合点 */
        removeCluster(): void

        /** 添加聚合点点击事件的监听*/
        addClusterListener(callback: (ret: {
            /**点击的标注的id */
            customID: number
        }, err: any) => void): void

        /**在地图上添加折线 */
        addLine(params: bMap.addLine): void

        /**在地图上添加多边形 */
        addPolygon(params: bMap.addPolygon): void

        /**在地图上添加弧形 */
        addArc(params: bMap.addLine): void

        /**在地图上添加圆形 */
        addCircle(params: bMap.addCircle): void

        /**在地图上添加图片 */
        addImg(params: bMap.addImg): void

        /**移除指定 id 的覆盖物（addLine、addPolygon、addArc、addCircle、addImg添加的覆盖物） */
        removeOverlay(params: bMap.ids): void

        /**搜索路线方案，无需调用 open 接口即可使用 */
        searchRoute(params: bMap.searchRoute, callback: (ret: bMap.searchRouteRet, err: bMap.searchRouteErr) => void): void

        /**在地图上显示指定路线，调用本接口前，必须保证已经调用过接口 open 和 searchRoute */
        drawRoute(params: bMap.drawRoute, callback: (ret: {
            /**点击路线上结点的索引（该路线在所属方案 nodes 数组内的索引） */
            nodeIndex: number

            /**点击的结点所在的路线的 id */
            routeId: number

        }, err: any) => void): void

        /**移除指定 id 的路线 */
        removeRoute(params: bMap.ids): void

        /**根据关键字搜索公交、地铁线路，无需调用 open 接口即可搜索 */
        searchBusRoute(params: {
            /**描述：城市 */
            city: string

            /**描述：公交、地铁线路号（例如：1路，1号线） */
            line: string
        }, callback: (ret: bMap.searchBusRouteRet, err: bMap.code) => void): void

        /**根据 searchBusRoute 搜索返回的 uid 查询线路详情并绘制在地图上 */
        drawBusRoute(params: {
            /**描述：地图上显示的公交、地铁路线的 id，removeBusRoute 时使用此 id */
            id: number

            /**描述：城市 */
            city: string

            /**
             * 描述：路线渲染结束是否自动调整地图可视区域
             * 默认值：true
             *  */
            autoresizing: boolean

            /**描述：searchBusRoute 接口获取到的目标兴趣点的 uid */
            uid: string
        }, callback: (ret: bMap.drawBusRouteRet, err: bMap.code) => void): void

        /**移除地图上显示的公交、地铁线路 */
        removeBusRoute(params: bMap.ids): void

        /**根据单个关键字搜索兴趣点，无需调用 open 接口即可搜索 */
        searchInCity(params: bMap.searchInCity, callback: (ret: bMap.searchInCityRet, err: bMap.code) => void): void

        /**根据单个关键字在圆形区域内搜索兴趣点，无需调用 open 接口即可搜索 */
        searchNearby(params: bMap.searchNearby, callback: (ret: bMap.searchInCityRet, err: bMap.code) => void): void

        /**根据单个关键字在方形区域内搜索兴趣点，无需调用 open 接口即可搜索 */
        searchInBounds(params: bMap.searchInBounds, callback: (ret: bMap.searchInCityRet, err: bMap.code) => void): void

        /**根据关键字返回建议搜索关键字，无需调用 open 接口即可搜索 */
        autocomplete(params: {
            /**描述：关键字 */
            keyword: string

            /**描述：（可选项）要搜索的城市 */
            city?: string
        }, callback: (ret: {
            /**true||false */
            status: boolean,

            /**返回建议搜索关键字组成的数组 */
            results: Array<any>
        }, err: bMap.code) => void): void

        /**获取热门城市列表，无需调用 open 接口 */
        getHotCityList(callback: (ret: bMap.getHotCityList, err: any) => void): void

        /**获取支持离线下载城市列表，无需调用 open 接口 */
        getOfflineCityList(callback: (ret: bMap.getHotCityList) => void): void

        /**获取支持离线下载城市列表，无需调用 open 接口 */
        getOfflineCityList(params: {
            /**描述：指定搜索的城市名 */
            name: string
        }, callback: (ret: bMap.getHotCityList, err: any) => void): void

        /**获取各城市离线地图更新信息，无需调用 open 接口 */
        getAllUpdateInfo(callback: (ret: bMap.UpdateInfo, err: any) => void): void

        /**获取指定城市id离线地图更新信息，无需调用 open 接口 */
        getUpdateInfoByID(params: bMap.cityID, callback: (ret: bMap.UpdateInfo, err: any) => void): void

        /**启动下载指定城市 id 的离线地图，无需调用 open 接口 */
        start(params: bMap.cityID, callback: (ret: bMap.ret, err: any) => void): void

        /**启动更新指定城市 id 的离线地图，无需调用 open 接口 */
        update(params: bMap.cityID, callback: (ret: bMap.ret, err: any) => void): void

        /**暂停下载指定城市 id 的离线地图，无需调用 open 接口 */
        pause(params: bMap.cityID, callback: (ret: bMap.ret, err: any) => void): void

        /**删除下载指定城市 id 的离线地图，无需调用 open 接口 */
        remove(params: bMap.cityID, callback: (ret: bMap.ret, err: any) => void): void

        /**监听离线地图相关事件 */
        addOfflineListener(callback: (ret: bMap.addOfflineListener, err: any) => void): void
    }

    namespace bMap {

        /**是否初始化成功|，true||false */
        interface ret {
            status: boolean
        }

        interface initMapSDKCode {
            /**
             * 错误码
             * -300：链接服务器错误
             * -200：服务返回数据异常
             * 0：授权验证通过
             * 101：ak不存在
             * 102：mcode签名值不正确
             * 200:APP不存在，AK有误请检查再重试
             * 201:APP被用户自己禁用，请在控制台解禁
             * 更多错误码参考：http://lbsyun.baidu.com/index.php?title=lbscloud/api/appendix
             *  */
            code: number
        }

        interface open {
            rect: rect

            /**
             * 描述：（可选项）打开地图时设置的中心点经纬度，若不传则默认打开北京市为中心的地图
             */
            center?: bMap.lonlat

            /**
             * 描述：（可选项）设置百度地图缩放等级，取值范围：3-18级
             * 默认值：10
             */
            zoomLevel?: number

            /**
             * 描述：（可选项）是否在地图上显示用户位置
             * 默认值：true
             */
            showUserLocation?: boolean

            /**
            * 描述：（可选项）模块视图添加到指定 frame 的名字（只指 frame，传 window 无效）
            * 默认值：模块依附于当前 window
            *  */
            fixedOn?: string

            /**
             * 描述：（可选项）模块是否随所属 window 或 frame 滚动
             * 默认值：true（不随之滚动）
             *  */
            fixed?: boolean
        }


        /** */
        interface customStyle {
            /**
             * 描述：（可选项）主图文件路径，要求本地路径（widget://、fs://）(android不支持widget)，configPath优先级高于customConfig
             * 注：使用自定义主题时，请参照百度个性地图来设置
             * 默认：使用模块内置主题
             */
            configPath?: string

            /**
             * 描述：（可选项）模块内置主题
             * night->黑夜|lightblue->清新蓝|midnightblue->午夜蓝
             * 注：使用自定义主题时，请参照百度个性地图来设置
             * 默认：night
             */
            customConfig?: "night" | "lightblue" | "midnightblue"

        }

        interface getLocation {
            /**
             * 描述：（可选项）定位精度
             * 默认值：'100m'
             */
            accuracy?: "10m" | "100m" | "1km" | "3km"

            /**
             * 描述：（可选项）获取到位置信息后是否自动停止定位
             * 默认值：true
             *  */
            autoStop?: boolean

            /**
             * 描述：（可选项）位置更新所需的最小距离（单位米），autoStop 为 true 时，此参数有效
             * 默认值：1.0
             */
            filter?: number

            /**
             * 描述：(可选项) 开发者应用如果有后台定位需求，在退到后台的时候，为了保证定位可以在后台一直运行，可以设置为true，适配android 8后台无法定位问题，其他版本下也会提高定位进程存活率(ios不支持)
             * 默认值：false
             */
            enableLocInForeground?: boolean

            /**描述：(必选项) 通知栏的提示，此字段只有在enableLocInForeground设置为true时有效。(百度为了app能够在后台持续定位，就得需要开启一个前台服务，要开启一个前台服务就得开启通知栏提示)(ios不支持)*/
            notification: {
                /**
                 * 为通知栏notifation设置唯一id，必须大于0
                 */
                id: number

                /**标题 */
                contentTitle: string

                /**内容 */
                contentText: string
            }
        }

        interface getLocationRet extends ret, lonlat {
            /**本次定位的精度，仅支持 iOS 平台 */
            accuracy: number

            /**时间戳 */
            timestamp: number

            /**定位类型 */
            locationType: "NetWork" | "GPS" | "OffLine"
        }

        interface getNameFromCoords extends ret, lonlat {
            /**省份 */
            province: string

            /**城市 */
            city: string

            /**县区 */
            district: string

            /**街道名 */
            streetName: string

            /**街道号 */
            streetNumber: string

            /**国家 */
            country: string

            /**国家代码 */
            countryCode: string

            /**行政区域编码 */
            adCode: string

            /**商圈名称 */
            businessCircle: string

            /**结合当前位置POI的语义化结果描述 */
            sematicDescription: string

            /**城市编码*/
            cityCode: string

            /**地址信息 */
            address: string

            /**经纬度点热点列表 */
            poiList: Array<poiList>
        }
        interface poiList {
            /**热点名称 */
            name: string

            /**热点id */
            uid: string

            /**热点地址 */
            address: string

            /**热点所在城市 */
            city: string

            /**热点电话 */
            phone: string

            /**热点邮编 */
            postcode: string

            /**热点类型，0:普通点 1:公交站 2:公交线路 3:地铁站 4:地铁线路 */
            epoitype: "0" | "1" | "2" | "3" | "4"

            /**热点坐标信息 */
            coord: bMap.lonlat

        }

        interface showUserLocation {
            /**
             * 描述：（可选项）是否显示用户位置
             * 默认值：true
             */
            isShow?: boolean

            /**
             * 描述：（可选项）用户当前位置显示形式
             * 默认值：none
             * 取值范围:
             * none（标准模式）注：Android平台为指向箭头，iOS平台为圆点
             * follow（跟踪模式）
             * compass（罗盘模式）
             */
            trackingMode?: "none" | "follow" | "compass"

            /**
             * 描述：（可选项）自定义当前位置图标的图片名称 (android不支持)
             * 默认值：百度地图默认当前位置图标
             * 注意：使用此模块需要自定义模块，参见“概述”内容
             */
            imageName?: string

            /**
             * 描述：(可选项)当前位置显示图标的图片，支持fs,widget (ios不支持)
             * 默认值：百度地图默认当前位置图标
             */
            imagePath?: boolean


        }

        interface setMapAttr {
            /**
             *描述：（可选项）设置地图类型 
             * 默认值：'standard'
             * 取值范围：
             * standard（标准地图）|trafficOn（打开实时路况）|trafAndsate（实时路况和卫星地图）|satellite（卫星地图）
             * 
             */
            type?: "standard" | "trafficOn" | "trafAndsate" | "satellite"

            /**
             *描述：（可选项）捏合手势是否可以缩放地图 
             * 默认值：true
             */
            zoomEnable?: boolean

            /**
             *描述：（可选项）拖动手势是否可以移动地图 
             * 默认值：true
             */
            scrollEnable?: boolean

            /**
             *描述：（可选项）拖动手势是否可以旋转地图
             * 默认值：true
             */
            rotateEnabled?: boolean

            /**
             *描述：（可选项）拖动手势是否可以改变地图俯视角度 
             * 默认值：true
             */
            overlookEnabled?: boolean
        }

        interface orthogon {
            /**矩形区域左下角的经度 */
            lbLon: number

            /**矩形区域左下角的纬度 */
            lbLat: number

            /**矩形区域右上角的经度 */
            rtLon: number

            /**矩形区域右上角的纬度 */
            rtLat: number
        }

        interface startSearchGPSRet extends ret {
            /**当前能搜索到的卫星数 */
            satelliteCount: number

            /**各个卫星的信噪比 */
            snrArray: Array<number>
        }

        interface getRegion extends ret, orthogon { }

        interface setRegion extends orthogon {
            /**可选项）设置地图的区域时，是否带动画效果 */
            animation?: boolean
        }

        /**lon:原始地理坐标经度 lat:原始地理坐标纬度 */
        interface transCoords extends lonlat {
            /**描述：原始地理坐标类型
             * 默认值：common
             * 取值范围：
             * gps（GPS设备采集的原始GPS坐标）
             * common（google、soso、aliyun、mapabc、amap和高德地图所用坐标）
             */
            type: "gps" | "common"

            /**：到百度地图开放平台获取的安全码（Android端），点击应用的设置按钮 -> 设置界面 -> 安全码（数字签名+;+包名） */
            mcode: string
        }

        /**lon:转换后的百度地理坐标经度 lat:转换后的百度地理坐标纬度 */
        interface transCoordsRet extends ret, lonlat { }

        interface getCoordsFromNameRet extends ret, lonlat { }

        /**lon:触发事件的地点的经度（longPress，click，dbclick），地图中心的经度（viewChange，zoom）
         * lat:触发事件的地点的纬度（longPress，click，dbclick），地图中心的经度（viewChange，zoom）
         */
        interface addEventListenerRet extends ret, lonlat {
            /**地图缩放角度 */
            zoom: number
            /**地图旋转角度 */
            rotate: number
            /**视角倾斜度 */
            overlook: number
            /**zoomIn 放大，zoomOut缩小；name为zoom时有值 */
            zoomType: string
        }

        interface code {
            /**
             *错误码 
             *  1（检索词有岐义）
             *  2（检索地址有岐义）
             *  3（没有找到检索结果）
             *  4（key错误）
             *  5（网络连接错误）
             *  6（网络连接超时）
             *  7（还未完成鉴权，请在鉴权通过后重试
             */
            code: 1 | 2 | 3 | 4 | 5 | 6 | 7
        }

        interface lonlat {
            /**经度*/
            lon: number

            /**纬度*/
            lat: number
        }

        interface rect {
            /**
             * 描述：地图左上角的 x 坐标（相对于所属的 Window 或 Frame）
             *  默认：0
             */
            x?: number

            /**
             * 描述：地图左上角的 y 坐标（相对于所属的 Window 或 Frame）
             * 默认：0
             */
            y?: number

            /**
             * 描述：地图的宽度
             * 默认：所属的 Window 或 Frame 的宽度
             */
            w?: number

            /**
             * 描述：地图的高度
             * 默认：所属的 Window 或 Frame 的高度
             */
            h?: number
        }

        interface addEventListener {
            /**描述：地图相关事件名称
             * 取值范围：
             * longPress（长按事件）|
             * viewChange（地图视角范围改变事件）
             * click（单击事件）
             * dbclick（双击事件）
             * zoom（放大缩小事件）iOS 平台暂不支持此监听
             */
            name: "longPress" | "viewChange" | "click" | "dbclick" | "zoom"
        }

        interface getCurrentLocation extends ret, lonlat {
            /**是否正在更新位置信息，暂仅支持 iOS 平台 */
            updating: boolean

            /**当前位置的标题信息，暂仅支持 iOS 平台 */
            title: string

            /**当前位置的子标题信息，暂仅支持 iOS 平台 */
            subtitle: string

            /**当前位置方向信息，暂仅支持 iOS 平台 */
            headInfo: {
                /**地磁方向角度，范围：0.0 - 359.9，0表示正北 */
                magnetic: number

                /**地理方向角度，范围：0.0 - 359.9，0表示正北 */
                trueHeading: number

                /**方向精度，Represents the maximum deviation of where the magnetic heading may differ from the actual geomagnetic heading in degrees. A negative value indicates an invalid heading */
                accuracy: number
            }
        }

        interface addIndoorListener extends strIDStrFloor {
            /**进出室内地图，true：进入 */
            enter: boolean
        }

        interface strIDStrFloor {
            /**室内ID */
            strID: string

            /**当前楼层 */
            strFloor: string
        }

        interface indoorSearchRet extends ret {
            /**本次POI室内搜索的总结果数 */
            totalPoiNum: number

            /**当前页的室内POI结果数(android不支持) */
            currPoiNum: number

            /**本次POI室内搜索的总页数 */
            pageNum: number

            /**当前页的索引(android不支持) */
            pageIndex: number

            /**返回搜索结果列表 */
            poiIndoorInfoList: [{
                /**名称 */
                name: string

                /**POIuid */
                uid: string

                /**该室内POI所在 室内ID */
                indoorId: string

                /**该室内POI所在楼层 */
                floor: string

                /**地址 */
                address: string

                /**所在城市(android不支持) */
                city: string

                /**所在城市(android不支持) */
                cid: string

                /**电话号码*/
                phone: string

                /**位置信息 */
                pt: {
                    /** 维度*/
                    latitude: string

                    /** 经度*/
                    longtitude: string
                }

                /** POI标签*/
                tag: string

                /**价格 */
                price: number

                /**星级（0-50），50表示五星 */
                starLevel: number

                /**是否有团购 */
                grouponFlag: number

                /**是否有外卖 */
                takeoutFlag: number

                /**是否排队 */
                waitedFlag: number

                /**团购数,-1表示没有团购信息 */
                grouponNum: number
            }]
        }

        interface indoorSearchErr {
            /**
           *错误码 
           *  1（检索词有岐义）
           *  2（检索地址有岐义）
           *  3（该城市不支持公交搜索）
           *  4（不支持跨城市公交）
           *  5（没有找到检索结果）
           *  6（起终点太近）
           *  7（key错误）
           *  8（网络连接错误）
           *  9（网络连接超时）
           *  10（还未完成鉴权，请在鉴权通过后重试）
           *  11（室内图ID错误）
           *  12（室内图检索楼层错误）
           *  13（起终点不在支持室内路线的室内图内）
           *  14（起终点不在同一个室内）
           *  15（参数错误）
           */
            code: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12 | 13 | 14 | 15
        }
        /**图标标注信息组成的数组 */
        interface annotations {
            /**图标标注的唯一标识 */
            id: number

            /**图标标注所在位置的经度 */
            lon: number

            /**图标标注所在位置的纬度 */
            lat: number

            /**指定的标注图标，要求本地路径（fs://、widget://），若不传则显示公用的 icon 图标 */
            icon?: string

            /**所添加的标注是否可被拖动，若不传则以公用的 draggable 为准 */
            draggable?: boolean

            /**标注大小
             * 默认：30
             * 注：由于android上百度地图并没有提供接口来控制标注的大小，而是模块本身通过给定的宽高来计算缩放比来缩放背景图片(也就是icon参数)，以此来达到改变整个标注大小的目的，会有一定的偏差，所以在android上的处理方式是如果不传此参数，按照原图来展示
             *  */
            size?: number
        }

        /** */
        interface addAnnotations {
            annotations: Array<bMap.annotations>

            /**（可选项）公用的标注图标，要求本地路径（fs://、widget://） */
            icon?: string

            /**
              * 描述：（可选项）所添加的标注是否可被拖动
              * 默认:false
              */
            draggable?: boolean
        }

        interface addAnnotationsRet {
            /**相应事件的标注的 */
            id: 10

            /**
             * 交互事件类型
             * click（用户点击标注事件）
             * drag（用户拖动标注事件）
             */
            eventType: "click" | "drag"

            /**
             * 标注被拖动的状态，当 eventType 为 drag 时本字段有值
             * starting（开始拖动）
             * dragging （拖动中）
             * ending （拖动结束）
             */
            dragState: "starting" | "dragging" | "ending"

        }

        interface id {
            /**指定的标注 id  addWebBubbleListener:用户点击气泡返回的id*/
            id: number
        }

        interface setAnnotationCoords extends id, lonlat { }


        interface setBubble extends id, styles {
            /**
             * 描述：（可选项）弹出气泡的背景图片（160*90规格），要求本地路径（fs://、widget://）
             * 默认值：默认气泡样式
             */
            bgImg?: string

            /**弹出气泡的内容 */
            content: {
                /**弹出气泡的标题 */
                title: string

                /**弹出气泡的概述内容，若不传则 title 在上下位置居中显示 */
                subTitle?: string

                /**弹出气泡的配图（30*40规格），支持http://、https://、widget://、fs://等协议 */
                illus?: string
            }
        }

        interface styles {
            /**弹出气泡|布告牌的样式 */
            /**
          * 描述：顶部标题字体颜色，支持#、rgb、rgba 
          * 默认：#fff
          */
            titleColor?: string

            /**
             *描述：顶部标题字体大小
             * 默认：20
             */
            titleSize?: number

            /**
             *描述：气泡|布告牌概述内容的文字颜色，支持rgb、rgba、#；
             * 默认：#000
             */
            subTitleColor?: string

            /**
             *描述：气泡布告牌概述内容的文字大小；
             * 默认：16
             */
            subTitleSize?: number

            /**
             *描述：气泡|布告牌配图的显示位置
             * 默认：left
             */
            illusAlign?: "left" | "right"

            /**
             * 描述：气泡|布告牌的宽
             * 默认：默认：title的长度
             * setBubble:默认:title 的长度,并且不会超过地图视图的宽度-64，不会小于160（注：android不会计算title的长度，传多少是多少;另：addBillboard: 默认:160由于android上百度地图并没有提供接口来控制气泡的宽高，而是模块本身通过给定的宽高来计算缩放比来缩放背景图片(也就是bgImg参数)，以此来达到改变整个气泡大小的目的，会有一定的偏差，所以在android上的处理方式是如果不传此参数，按照原图来展示；h参数同理）
             */
            w?: number

            /**
            * 描述：气泡|布告牌的高
            * 默认：setBubble气泡:90|addBillboard气泡:75
            */
            h?: number
        }
        interface setBubbleRet extends id, eventType { }

        interface eventType {
            /**
           * 交互事件类型
           * clickContent（点击气泡文本内容）
           * clickIllus（点击配图）
           */
            eventType: "clickContent" | "clickIllus"
        }

        interface addBillboard extends styles {
            /**描述：布告牌的 id，注意：本 id 不可与 addAnnotations 接口内的 id 相同 */
            id: number

            /**布告牌所在位置的坐标  lonlat:布告牌所在位置的经纬度*/
            coords: bMap.lonlat

            /**
             * 描述：（可选项）弹出气泡的背景图片（160*90规格），要求本地路径（fs://、widget://）
             * 默认值：默认气泡样式
             */
            bgImg: string

            /**弹出气泡的内容 */
            content: {
                /**布告牌的标题 */
                title?: string

                /**布告牌的概述内容 */
                subTitle?: string

                /**布告牌的配图（35*50规格），支持http://、https://、widget://、fs://等协议*/
                illus?: string
            }
        }

        interface addClusterStyles {
            /**聚合点的大小(注:android上此参数只能设置pointBg为颜色的时候，单个标注的大小) */
            size?: {
                /**聚合点的宽
                 * 默认：22.0
                 *  */
                w?: number

                /**聚合点的高
                 * 默认：22.0
                 */
                h?: number
            }
            /**聚合点样式配置 */
            bg: {
                /**单个点的背景配置，支持rgba、rgb、#、img；
                 * 默认:默认图标
                 */
                pointBg: '',

                /**聚合点等级组成的数组，（android不支持）如：[1,5,10]表示有2-5、6-10、10+（不包含10个以上点的聚合点）三个等级，每个等级的聚合点可配置不同的样式（对应bgs数组内的元素）。；
                 * 默认：[1,5,10]
                 */
                grade: Array<number>

                /**各等级聚合点的背景配置，与grade一一对应，支持rgb、rgba、#、img（本地路径fs://、widget://）；（android不支持）
                 * 默认：['蓝色','绿色','红色']
                 *  */
                bgs: Array<string>

                /**各等级聚合点显示的数字字体颜色，与grade一一对应，支持rgb、rgba、#；（android不支持）
                 * 默认：['#fff','#fff','#fff']
                 */
                numberColors: Array<string>
            }

            /**描述：为字符串类型时表示点信息文件路径，要求本地路径（widget://、fs://）；若传数组类型则表示直接将点数据传给模块 */
            data: [{
                /**点纬度 */
                lat: number

                /**点经度 */
                lon: number

                /**点击后弹出气泡的标题 */
                title: string

                /**点击后弹出气泡的子标题 */
                subtitle: string

                /**点自定义ID */
                customID: string
            }] | string
        }
        interface setWebBubble {
            /**要设置气泡的标注 id */
            id: bMap.id

            /**（可选项）弹出气泡的网页地址，用户点击标注时，模块在标注上弹出窗口（类似open一个frame，模块会用webview去加载此url的网页显示出来）,当data参数不为空时，url将做为baseUrl，data中的html引用的资源文件根路径以该url为基础。 */
            url?: string

            /**（可选项）页面加载的数据内容，可以为html片段或者整张html文件的数据,当data为空或者不传的时候， 会将url地址作为整个加载进去 */
            data?: string

            /**（可选项）气泡的大小配置 */
            size?: {
                /**（可选项）数字类型；气泡的宽；默认：50 */
                width?: number

                /**（可选项）数字类型；气泡的高；默认：50 */
                height?: number
            }

            /**描述：（可选项）弹出气泡的背景设置，支持rgb、rgba、#、img（要求本地路径，如：widget://、fs://）(android不支持rgb、rgba、#)
             * 默认：rgba(0,0,0,0)
             */
            bg?: string
        }

        interface addLine extends shapeCommen {
            /**（可选项）折线|弧形的样式 */
            styles?: bMap.shapeCommenStyles
        }

        interface addPolygon extends shapeCommen {
            /**（可选项）多边形|圆形的样式 */
            styles?: bMap.shapeCommenStylesM
        }

        interface shapeCommen {
            /**线的 id  ：addImg、 addLine、addPolygon、addArc 、addCircle接口的 id 不能相同*/
            id: number

            /**线的多个点组成的数组 */
            points: Array<bMap.lonlat>
        }



        /**（可选项）线的样式 */
        interface shapeCommenStyles {
            /**线的颜色，支持rgb、rgba、#；默认值：'#000' */
            borderColor?: string

            /**线的宽度，默认：1 */
            borderWidth?: string
        }



        interface shapeCommenStylesM extends shapeCommenStyles {
            /**填充色，支持rgb、rgba、#；默认：'#000' */
            fillColor?: string
        }

        /**在地图上添加圆形 */
        interface addCircle {
            /**圆的 id */
            id: number

            /**圆形中心点的经纬度 */
            center: bMap.lonlat

            /**圆形的样式 */
            styles?: bMap.shapeCommenStylesM
        }

        interface addImg extends orthogon {
            /**圆的 id */
            id: number

            /**图片的路径，要求本地路径（fs://、widget://） */
            imgPath: string

            /*
            * 描述：图片透明度，取值范围：0-1
            * 默认：1
            */
            opacity: number
        }

        interface searchRoute {
            /**描述：搜索的路线 id ，drawRoute 时使用*/
            id: number

            /**
             * 描述：（可选项）路线类型
             * 默认值：transit
             * 取值范围：drive（开车）|transit（公交）|walk（步行）|riding（骑行）
             */
            type?: "drive" | "transit" | "walk" | "riding"
            /**
             * 描述：（可选项）路线策略，type 为 walk（步行）或 riding（骑行）时，此参数可不传
             * 默认值：'ebus_time_first/ecar_time_first'
             * 注：android从1.1.6版本开始公交换乘不支持(ebus_no_subway, ebus_time_first, ebus_transfer_first, ebus_walk_first字段)
             *ecar_fee_first（驾乘检索策略常量：较少费用）
             *ecar_dis_first（驾乘检索策略常量：最短距离）
             *ecar_time_first（驾乘检索策略常量：时间优先）
             *ecar_avoid_jam（驾乘检索策略常量：躲避拥堵）
             *ebus_no_subway（公交检索策略常量：不含地铁）
             *ebus_time_first（公交检索策略常量：时间优先）
             *ebus_transfer_first（公交检索策略常量：最少换乘）
             *ebus_walk_first（公交检索策略常量：最少步行距离）
             *ebus_in_time (市内公交检索策略常量：时间短)(ios不支持)
             *ebus_in_transfer (市内公交检索策略常量：少换乘)(ios不支持)
             *ebus_in_walk (市内公交检索策略常量：少不行)(ios不支持)
             *ebus_in_no_subway (市内公交检索策略常量：不坐地铁)(ios不支持)
             *ebus_in_subway_first (市内公交检索策略常量：地铁优先)(ios不支持)
             *ebus_in_suggest (市内公交检索策略常量：推荐)(ios不支持)
             *ebus_out_price (跨城公交检索策略常量：价格低)(ios不支持)
             *ebus_out_time (跨城公交检索策略常量：时间短)(ios不支持)
             *ebus_out_start_early (跨城公交检索策略常量：出发早)(ios不支持)
             */
            policy?: "ecar_fee_first" | "ecar_dis_first" | "ecar_time_first" | "ecar_avoid_jam" | "ebus_no_subway" | "ebus_time_first" | "ebus_transfer_first" | "ebus_transfer_first" | "ebus_in_time " | "ebus_in_transfer " | "ebus_in_walk " | "ebus_in_no_subway" | "ebus_in_subway_first " | "ebus_in_suggest " | "ebus_out_price" | "ebus_out_time " | "ebus_out_start_early "

            /**描述：起点信息(ios不支持)*/
            start: bMap.lonlat

            /**描述：终点信息 */
            end: bMap.lonlat

            /**起点和终点是否是同一城市
             * 注：当type为transit时，必须写此字段
             */
            isSameCity: boolean
        }

        interface searchRouteRet extends ret {
            /**路线方案描述 */
            plans: [{
                /**起点信息 */
                start: bMap.startEnd

                /**终点信息 */
                end: bMap.startEnd


                /**路线经过的结点信息组成的数组 */
                nodes: [bMap.nodes]

                /**路线长度，单位：米 */
                distance: number

                /**路线耗时，单位：秒 */
                duration: number
            }]
        }

        interface startEnd extends lonlat {
            /**起点|终点说明文字/ 公交站描述 */
            description: string
        }

        interface nodes extends startEnd {
            /**结点转弯角度 */
            degree: number
        }

        interface searchRouteErr extends suggestStartsEnd {
            /**
         *错误码 
         * -1（未知错误）
         *  1（检索词有岐义）
         *  2（检索地址有岐义）
         *  3（该城市不支持公交搜索）
         *  4（不支持跨城市公交）
         *  5（没有找到检索结果）
         *  6（起终点太近）
         *  7（key错误）
         *  8（网络连接错误）
         *  9（网络连接超时）
         *  10（还未完成鉴权，请在鉴权通过后重试）
         */
            code: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10
        }

        /** */
        interface ids {
            /**描述：要移除的 id（数字）组成的数组 */
            ids: Array<number>
        }

        /**数组类型；建议起点|终点信息，若传入的起点|终点信息不明确，则返回该字段 */
        interface suggestStartsEnd extends lonlat {
            /**地点名 */
            name: string,
            /**地点所在城市 */
            city: string,
        }

        interface drawRoute {
            /**描述：路线 id （searchRoute 时传的 id），removeRoute 时使用此 id 移除路线*/
            id: number

            /**描述：路线渲染结束是否自动调整地图可视区域
             * 默认值：true
             */
            autoresizing: boolean

            /**
             * 描述：路线方案的索引，在 searchRoute 时返回的多个路线方案组成的数组中的索引
             * 默认值：0
             */
            index: number

            /**
             * 描述：路线样式设置
             * 注：android目前sdk不支持地铁类型，所以出行方式为地铁的均会以公交的方式来绘制了路线，包括节点
             *  */
            styles: bMap.drawRouteStyles
        }


        interface drawRouteStyles {
            /**起点样式配置，不传则不显示 */
            start: bMap.iconSize

            /**终点样式配置，不传则不显示 */
            end: bMap.iconSize

            /**路线样式配置，不传则显示默认值 */
            line: bMap.lineStyleConfig

            /**节点样式，不传则不显示。注意节点并不一定是转弯点。 */
            node: bMap.iconSize

            /**乘公交路时的线样式配置，不传则以line为准 ，仅当搜索路线类型为 transit 时有效 */
            busLine: bMap.lineStyleConfig

            /**乘坐地铁时的路线样式配置，不传则以line为准 ，仅当搜索路线类型为 transit 时有效 */
            subwayLine: bMap.lineStyleConfig

            /**步行时的路线样式配置，不传则以line为准 ，仅当搜索路线类型为 transit 时有效 */
            walkLine: bMap.lineStyleConfig

            /**切换为公交时节点样式，不传则显示默认值，仅当搜索路线类型为 transit 时有效 */
            busNode: bMap.iconSize

            /**切换为地铁时节点样式，不传则显示默认值，仅当搜索路线类型为 transit 时有效 */
            subwayNode: bMap.iconSize

            /**切换为步行时节点样式，不传则显示默认值，仅当搜索路线类型为 transit 时有效 */
            walkNode: bMap.iconSize
        }
        interface iconSize {
            /**起点|终点图标(路径)，要求本地路径（fs://、widget://）;默认：百度 */
            icon: string

            /**起点|终点图标|节点 大小；默认：30 (android不支持) */
            size: number
        }

        interface lineStyleConfig {
            /**折线的颜色，支持rgb、rgba、#；默认值：'#0000FF' */
            color: '#0000FF'

            /**折线的宽度，默认：3 */
            width: number,

            /**是否显示为虚线；默认：false */
            dash: boolean,

            /**纹理图片路径，要求本地路径（fs://、widget://）；默认：无 */
            textureImg: strIDStrFloor
        }

        interface searchBusRouteRet extends ret {
            results: [{
                /**地点名 */
                name: string,

                /**兴趣点 uid */
                uid: string

                /**地点所在城市 */
                city: string,

                /**
                 * POI 类型
                 *2（公交线路）| 4（地铁线路）
                 *  */
                poiType: 2 | 4
            }]
        }

        interface drawBusRouteRet extends ret, eventType {
            /**公交线路名称 */
            name: string

            /**公交公司名称 */
            company: string

            /**公交路线首班车时间，格式为：hh:ss */
            startTime: string

            /**公交路线末班车时间，格式为：hh:ss */
            endTime: string

            /**公交是线是否有月票 */
            isMonTicket: boolean

            /**所有站点信息 */
            stations: Array<bMap.startEnd>

            /**点击路线上结点的索引（在 stations 数组内的索引） */
            nodeIndex: number

            /**点击的结点所在的路线的 id*/
            routeId: number

        }

        interface indoorSearch extends Search {
            /**室内ID */
            strID: string
        }

        interface searchInCity extends Search {
            /**描述：要搜索的城市 */
            city: string
        }

        interface Search {
            /**描述：搜索的关键字 */
            keyword: string

            /**
             * 描述：（可选项）分页索引
             * 默认：0
             */
            pageIndex: number

            /**
             * 描述：（可选项）每页包含数据条数，最多为50
             * 默认：10
             */
            pageCapacity: number
        }

        interface searchInCityRet extends ret {
            /**本次搜索的总结果数 */
            totalNum: number

            /**当前页的结果数 */
            currentNum: number
            /**本次搜索的总页数 */
            totalPage: number
            /**当前页的索引 */
            pageIndex: number
            results: [{
                /**当前内容的经度 */
                lon: number

                /**当前内容的纬度 */
                lat: number

                /**兴趣点 uid */
                uid: string

                /**描述：（可选项）地址所在城市 */
                city: string

                /**描述：地址信息 */
                address: string

                /**热点电话 */
                phone: string

                /**
                 * POI 类型
                 *0（普通点）|1（公交站）| 2（公交线路）|3（地铁站）| 4（地铁线路）
                 *  */
                poiType: 0 | 1 | 2 | 3 | 4
            }]
        }

        interface searchNearby extends Search, lonlat {
            /**描述：指定区域的半径，单位为 m（米） */
            radius: number
        }

        interface searchInBounds extends Search, setRegion { }

        interface getHotCityList extends ret {
            /**返回热门城市的信息 */
            records: Array<bMap.getHotCityListRecords>
        }

        interface getHotCityListRecords extends recordsCommen {
            /**城市类型，0：全国；1：省份；2：城市；如果是省份，可以通过childCities得到子城市列表 */
            cityType: number

            /**子城市列表 */
            childCities: [{
                /**城市名称 */
                name: string

                /**城市ID */
                cityID: number
            }]
        }

        interface recordsCommen {
            /**城市名称 */
            name: string

            /**数据包总大小 */
            size: number

            /**城市ID */
            cityID: number
        }

        interface UpdateInfoRecords extends recordsCommen, lonlat {
            /**服务端数据大小，当update为YES时有效，单位：字节 */
            serversize: number

            /**下载比率，100为下载完成，下载完成后会自动导入，status为4时离线包导入完成 */
            ratio: number

            /**更新状态，离线包是否有更新（有更新需重新下载） */
            update: boolean

            /**
             * 下载状态, 
             * -1:未定义
             * 1:正在下载
             * 2:等待下载
             * 3:已暂停
             * 4:完成
             * 5:校验失败
             * 6:网络异常
             * 7:读写异常
             * 8:Wifi网络异常
             * 9:离线包数据格式异常，需重新下载离线包 
             * 10:离线包导入中
             */
            status: number
        }

        interface UpdateInfo extends ret {
            /**返回支持离线下载城市的信息 */
            records: Array<bMap.UpdateInfoRecords>
        }

        interface cityID {
            /**描述：指定的城市id */
            cityID: string
        }

        interface addOfflineListener {
            /**
             * 事件类型
             * 0：下载或更新 
             * 1：检测到的压缩包个数(android不支持)
             * 2：当前解压的离线包(android中此类型表示离线地图网络问题)
             * 3：错误的离线包(android不支持) 
             * 4：有新版本
             * 5：扫描完毕(android不支持)
             * 6：新增离线包(android中此类型表示新安装离线地图事件)*/
            type: number

            /**
             * 事件状态 
             * 0 时，表示正在下载或更新城市id为state的离线包
             * 1时，表示检测到state个离线压缩包
             * 2时，表示正在解压第state个离线包
             * 3时，表示有state个错误包
             * 4时，表示id为state的城市离线包有更新
             * 5时，表示扫瞄完成，成功导入state个离线包
             * 6时，表示新安装的离线地图数目
             * */
            state: number
        }

    }
}