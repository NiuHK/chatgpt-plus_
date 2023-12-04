import Store from '@/components/pages/plugin/Store'
import { useTranslation } from '@/locales'
import { useSiteContext } from '@/contexts/site'
import { ReactNode, useEffect, useState } from 'react'
import { usePluginContext } from '@/contexts'
import { useRouter } from 'next/router'

function IndexPage() {
  const router = useRouter()
  const { setTitle, event$ } = useSiteContext()
  const { t } = useTranslation()
  const { pluginList } = usePluginContext()
  const [action, setAction] = useState<string>('')
  const [openList, setOpenList] = useState<boolean>(true)
  const [ContentElement, setContentElement] = useState<ReactNode>(<></>)

  event$.useSubscription((val: any) => {
    if (val?.type == 'tabSwich') {
      // 二次点击，则隐藏消息列表
      if (val?.url.indexOf('/plugin') > -1) {
        console.log(val)
        setOpenList(!openList)
      }
    }
  })
  useEffect(() => {
    const title = t('window.title', { title: t('c.plugin') })
    setTitle(title)
  }, [setTitle, t])

  const setContent = (ele: ReactNode) => {
    setContentElement(ele)
  }

  const renderBox = () => {
    return ContentElement
  }
  return (
    <>
      <div style={{ display: 'flex', flexDirection: 'row', height: '100%' }}>
        <Store ></Store>
      </div>
    </>
  )
}

export default IndexPage
