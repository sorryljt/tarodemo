import { useState } from 'react'
import { View, Text, WebView } from '@tarojs/components'
import { useLoad, requirePlugin } from '@tarojs/taro'
import './index.less'

var plugin = requirePlugin("WechatSI")
let manager = plugin.getRecordRecognitionManager()

export default function Index() {

  const [resultText, setResultText] = useState<string>('')

  useLoad(() => {
    console.log('Page loaded.')
    manager.onRecognize = function(res) {
      console.log("current result", res.result)
    }
    manager.onStop = function(res) {
        console.log("record file path", res.tempFilePath)
        console.log("result", res.result)
        setResultText(res.result)
    }
    manager.onStart = function(res) {
        console.log("成功开始录音识别", res)
    }
    manager.onError = function(res) {
        console.error("error msg", res.msg)
    }
    // manager.start({duration:30000, lang: "zh_CN"})
  
  })

  const touchStartHandle = () => {
    manager.start({duration:30000, lang: "zh_CN"})
  }

  const touchEndHandle = () => {
    manager.stop()
  }

  return (
    <View className='index'>
      {/* <WebView src='https://mp.weixin.qq.com/' /> */}
      <View
        onTouchStart={touchStartHandle}
        onTouchEnd={touchEndHandle}
      >长按语音输入</View>
      <View>
        <Text>{resultText}</Text>
      </View>
    </View>
  )
}
