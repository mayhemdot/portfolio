'use client'

import { FC } from 'react'
import { Map, Placemark, YMaps } from '@pbe/react-yandex-maps'

const defaultState = {
  // center: [55.751574, 37.573856],
  center: [55.684758, 37.738521],
  zoom: 15,
}

interface IYandexMapProps {
  id: string
  cityXY?: {
    center: number[]
    zoom: number
  }
}

const YandexMap: FC<IYandexMapProps> = ({ id, cityXY }) => {
  if (!cityXY) {
    cityXY = defaultState
  }
  return (
    <YMaps>
      <Map
        id={id}
        defaultState={cityXY}
        width={'100%'}
        //  query={{ apikey: process.env.NEXT_YANDEX_MAP_API_KEY }}
      >
        <Placemark geometry={[55.684758, 37.738521]} />
      </Map>
    </YMaps>
  )
}

export default YandexMap
