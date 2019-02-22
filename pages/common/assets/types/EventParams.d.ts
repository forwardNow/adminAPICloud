declare namespace api {
	interface EventParams {
        Params: {
			name: string;
		},
		CallBack: (
			ret: {
				
			},
			err: Dictionary<any>
		) => void
    }
}
