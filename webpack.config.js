const path = require('path')
const HtmlPlugin = require('html-webpack-plugin')
const CopyPlugin = require('copy-webpack-plugin')
const { VueLoaderPlugin } = require('vue-loader') // 추가

module.exports = {
    resolve: {
        extensions: ['.js', '.vue'], // 추가: vue 확장자 자동 인식
        alias: {
            '~': path.resolve(__dirname, 'src'),
            'assets': path.resolve(__dirname, 'src/assets')
        }
    }, 
    
	// 파일을 읽어들이기 시작하는 진입점 설정
    entry: './src/main.js',	// 엔트리 파일 인식. 번들링 결과물에 포함시킴
    output: {
    	// 현재는 path와 filename이 기본값과 동일하므로 생략 가능
    	// path: path.resolve(__dirname, 'dist'),	//절대경로 필요, 폴더명
        // filename: 'main.js',
        clean: true	// 새로 build 시 기존 필요없는 파일/폴더 삭제
    },
    
   module: {
        rules: [
            {
                test: /\.vue$/,     // 추가
                use: 'vue-loader'   // 추가
            },
            {
                test: /\.s?css$/,	// .css 또는 scss로 끝나는 파일 인식
                use: [
                    'vue-style-loader', // 추가
                    'style-loader',	// html에 삽입해주는 역할
                    'css-loader',	// 먼저 해석됨. js에서 css에서 인식하도록 해석
                    'postcss-loader',	// 공급업체 접두사 적용
                    'sass-loader'	// 가장 먼저 해석됨. js에서 scss에서 인식하도록 해석
                ]
            },
            { 
                test:/\.js$/,
                use: [
                    'babel-loader'  //바벨이 적용될 수 있도록 설정
                ]
            },
            {
                test:/\.(png|jpe?g|gif|webp)$/,
                use: 'file-loader'
            }        
        ]
    },
    
    plugins:[
    	new HtmlPlugin({
        	template: './index.html'	// 번들링 결과물에 html을 포함시킴
        }),
        new CopyPlugin({
        	patterns: [
            	{ from: 'static' }		// 번들링 결과물에 스태틱 파일을 포함시킴
            ]
        }),
        new VueLoaderPlugin()   // 추가
    ],
    
    devServer:{
    	host: 'localhost'	// 서버 호스팅 주소
    }
}