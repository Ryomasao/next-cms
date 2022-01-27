import { Stack, Box, Center, Sidebar } from '@/components/everyLayout'

type Props = {}

export default function EveryLayoutPage(props: Props) {
  return (
    <Sidebar>
      <div>サイドバーサイドバーサイドバー</div>
      <div>
        <Box>
          <Center>
            <Stack>
              <h1>見出し</h1>
              <p>
                ここは先刻もっともこうした安心家といった事の頃に見らしいだろ。ざっと今が招待社はもうこの活動たたまでになっからならでしょをも仕事去っですたば、あまりには思っないないでた。道徳よりいうです方はもし偶然を同時にですたな。もし久原君が評教授それだけ相当を行くだろ権力その文学あなたか奔走にというお講演ましですらしくありて、その場合もこれか国人間が思って、大森君のものより専門の私でただいまお意味と思わて彼シャツがご発展を云っようにああお焦燥としですんて、どうにかはなはだ講義を思っですば来でものをやっなた。
              </p>
            </Stack>
          </Center>
        </Box>
        <Box invert>
          <Center>
            <Stack>
              <h1>見出し</h1>
              <p>
                ここは先刻もっともこうした安心家といった事の頃に見らしいだろ。ざっと今が招待社はもうこの活動たたまでになっからならでしょをも仕事去っですたば、あまりには思っないないでた。道徳よりいうです方はもし偶然を同時にですたな。もし久原君が評教授それだけ相当を行くだろ権力その文学あなたか奔走にというお講演ましですらしくありて、その場合もこれか国人間が思って、大森君のものより専門の私でただいまお意味と思わて彼シャツがご発展を云っようにああお焦燥としですんて、どうにかはなはだ講義を思っですば来でものをやっなた。
              </p>
            </Stack>
          </Center>
        </Box>
        <Box>
          <form action="">
            <Sidebar side="right" contentWidth="66.66%">
              <input type="text" />
              <button type="button">search</button>
              <button type="button">search</button>
            </Sidebar>
          </form>
        </Box>
      </div>
    </Sidebar>
  )
}
