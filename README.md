# 🌟 노션 포트폴리오 히트맵 웹 서비스 🚀

<img src="https://upload.wikimedia.org/wikipedia/en/thumb/2/2f/Kwangwoon_University_logo.svg/1200px-Kwangwoon_University_logo.svg.png" alt="KW Univ Logo" width="50px" height="50px"> 



## 📖 목차
- [프로젝트 개요](#about-the-project)
- [기능](#features)
- [사용 기술](#Technologies)
- [Treemap 개념](#treemap)
- [Treemapping 알고리즘](#treemapping)
- [Treamap 시각화 예시](#example)
- [프로젝트 일정](#schedule)
- [팀 역할](#team)

---

<h2 id="about-the-project"> 🌟 프로젝트 개요 (Abstract) </h2>

본 프로젝트는 **Notion 데이터베이스**에서 사용자의 주식 포트폴리오 데이터를 불러와 **히트맵 형태**로 시각화하는 **웹 애플리케이션**을 구현하는 프로젝트입니다. 사용자는 주식의 **보유량**과 **평균 매수 단가**를 기반으로 투자 비중을 시각적으로 파악할 수 있으며, **실시간 수익률**을 **야후 파이낸스 API**를 통해 제공받을 수 있습니다.


</br>

---

<h2 id="features"> ✨ 기능 (Features) </h2>

- 🚀 **데이터 연동**: 사용자의 Notion API 와 연동하여 데이터베이스에서 특정 필드를 읽어옵니다.
- 🎨 **시각화(Treemap)**: Shares x AvgBuyPrice 로 각 종목의 사각형 면적을 결정합니다. Squarified treemap 알고리즘을 사용합니다.
- 🔒 **실시간 업데이트**: Yahoo Finance API 와 연동하여 종목별 수익률을 계산합니다.
- ⚙️ **노션 임베드**: 시각화된 Treemap 을 노션에서 바로 볼 수 있게 임베드 기능을 지원합니다.

</br>

---

<h2 id="Technologies">🚀 사용 기술 (Technologies Used)</h2>

- **React(Vite)**: 프론트 환경 구축
- **Node.js**: 서버 사이드 환경 구축
- **D3.js**: 데이터 시각화 및 히트맵 구현
- **Notion API**: Notion에서 데이터를 읽어오는 기능
- **Yahoo Finance API**: 실시간 주식 시세 및 수익률 계산
- **AWS Amplify**: 프로젝트 배포 및 웹 호스팅
- **Fly.io**: 서버 호스팅
</br>

---

<h2 id="treemap"> 📬 Treemap 개념 (Treemap Concept)</h2>

**Treemap**은 계층적 데이터를 **면적이 다른 중첩 직사각형**으로 배치하는 시각화 기법입니다. 각 직사각형의 **면적**은 해당 항목의 값에 비례하며, **색상**은 추가적인 정보(본 프로젝트에서는 수익률)를 나타냅니다. 주식 포트폴리오에서는 **면적**을 **투자금액**으로 설정하고, **색상**을 **실시간 수익률**로 반영하여 **투자 비중**과 **수익률**을 직관적으로 비교할 수 있습니다.

</br>

---

<h2 id="treemapping"> 🖥️ Treemapping 알고리즘 (Technologies Used)</h2>

**Squarified** 알고리즘을 사용하여 각 항목을 직사각형으로 나누며, 각 영역은 **투자금액**에 비례하여 크기가 결정됩니다.
**색상**은 **수익률**을 기준으로 **적색(하락)**, **회색(보합)**, **녹색(상승)**의 그라데이션을 사용하여 투자 성과를 시각적으로 표현합니다.

</br>

---

<h2 id="example" >📊 포트폴리오 Treemap 시각화 예시</h3>

<p >
  <img src="assets/treemap-example.png" alt="Portfolio Treemap Example" width="200px" />
</p>

<p>
  각 사각형은 주식 종목을 나타내며, <b>면적</b>은 투자금액 비율, 
  <b>색상</b>은 실시간 수익률을 표현합니다.<br/>
  <b>청색(이익)</b> → <b>회색(보합)</b> → <b>적색(손실)</b>의 그라데이션을 통해 
  전체 포트폴리오의 투자 비중과 손익 상태를 직관적으로 확인할 수 있습니다.
</p>

| 색상 | 의미 |
|------|------|
| 🔵 파란색 | 이익 (수익률 > 0%) |
| ⚪ 회색 | 보합 (수익률 ≈ 0%) |
| 🔴 빨간색 | 손실 (수익률 < 0%) |

</br>

---
<h2 id="schedule"> 📅프로젝트 일정 (Project Schedule) </h2>

| 날짜 | 작업 내용 |
|------|----------|
| 10월 15일 ~ 10월 22일 | 프로젝트 초기 설정 및 요구사항 분석, GitHub 저장소 생성, 팀 역할 분담 |
| 10월 23일 ~ 10월 26일 | Notion API 연동 및 데이터 구조 설계, 페이지 레이아웃 설계 |
| 10월 27일 ~ 10월 30일 | D3.js를 이용한 히트맵 구현, 데이터 시각화 기능 추가 |
| 11월 1일 ~ 11월 5일 | 실시간 수익률 반영 기능 구현, GitHub Pages 배포 |
| 11월 6일 ~ 11월 10일 | UI/UX 개선 및 버그 수정, 최종 점검 |
| 11월 11일 ~ 12월 10일 | 테스트, 문서화 (README.md 작성) 및 최종 제출 준비 |

</br>

---
<h2 id="team"> ⛄️ 팀 역할 (Team Roles)</h2>

| 팀원 | 깃허브 | 역할 |
|------|------|-----------|
| 조성찬 | [<img src="https://github.com/holychann.png" alt="holychann" width="120" height="120" />](https://github.com/holychann) | GitHub 저장소 설정, 팀원 협업 관리 |
| 강준우 | <img src="https://github.com/Juunary.png" alt="Juunary GitHub profile" width="120" height="120" /> | Notion API 연동, 실시간 수익률 업데이트 기능 개발 |
| 이덕원 | <img src="https://github.com/ldw0228.png" alt="ldw0228 GitHub profile" width="120" height="120" /> | D3.js를 이용한 데이터 시각화 및 UI 구현 |

> Made with ❤️ by the 2025-1 Team
