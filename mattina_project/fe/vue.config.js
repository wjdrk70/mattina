const path=require('path')
module.exports = {
  lintOnSave: false,
  outputDir : path.resolve(__dirname,'../be/public/'),
  devServer: { 
         proxy: { // proxyTable 설정 
            '/api': { 
                    target: 'http://localhost:3000/api', 
                    changeOrigin: true , 
                    pathRewrite:{ 
                            "^/api" : '' 
          }
        }
      }
    }
}
