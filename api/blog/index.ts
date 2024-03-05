export type Article = {
  name: string
  title: string
  description: string
}

export const fetchArticles = async (): Promise<Article[]> => {
  const mockArticles: Article[] = [
    {
      name: 'weekly17',
      title: 'Weekly Archive #17 | 삶의 낙',
      description: `스타트업에서 4년간 인프라를 운영하며 좋았던/후회하는 (거의) 모든 인프라 결정들
이런 인프라 결정들에 대한 인사이트는 쉽게 얻을 수 있는 것이 아니고 정말 귀한 거라 공유하지 않을 수 없습니다. 프로덕트 개발 하실 떄 꼭 참고해보시길 바래요.
`
    },
    {
      name: 'weekly16',
      title: 'Weekly Archive #16 | 편리함!',
      description: `이번 주는 편의성 관련 기능들에 대한 이야기가 주를 이뤘던 것 같아요.
브라우저에서 vim 단축키를 사용할 수 있는 vimium부터 윈도우 꿀팁 단축키 등등 유용한 정보들을 잔뜩 얻어가는 느낌이네요! 이런 정보들을 공유하여 나누고 싶은 욕구를 끝없이 채우는 그날까지 이어졌으면 하는 바램입니다.
`
    },
    {
      name: 'weekly15',
      title: 'Weekly Archive #15 | Sora AI',
      description: `Sora: Creating video from text
OpenAI에서 텍스트로부터 비디오를 만들어내는 AI를 공개했습니다.
예전부터 비디오 생성 AI는 매우 부자연스러운 모습들을 많이 보여주었기 때문에 큰 기대는 하지 않았는데 결과물을 보고 놀라지 않을 수 없었습니다.
주변 배경이 일그러지는 현상도 없고, 움직임이 어색하다거나 한 모습도 보이지 않았습니다. 물론 글자같은 것은 제대로 못 만들어내긴 했지만, 이건 정말 AI가 한 걸음 더 갔는데? 라고 보여집니다.
유튜브도 AI 영상이 엄청나게 올라오게 될까요?`
    },
    {
      name: 'weekly14',
      title: 'Weekly Archive #14 | 100일',
      description: `위클리를 진행한지 벌써 14주차가 되었습니다!!
ODS STUDY 서버가 개설된지 곧 100일차가 되어가는데,
여기까지 올 수 있었던 이유는 지식은 공유하고 기록할수록 그 가치가 배가 된다는것을 여러분이 깊이 이해하기 때문이라 생각합니다. 100일차 성장에서 멈추지 않고 계속 달려나갔으면 좋겠습니다.
`
    }
  ]
  return mockArticles.map(article => article)
}
