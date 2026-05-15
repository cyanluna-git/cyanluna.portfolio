"use client";

import { useState, useEffect } from "react";
import Nav from "@/components/Nav";

type Lang = "en" | "ko";

const IMG = "/projects/smart-factory-qc/demo";

export default function ActiveQcPage({ initialLang = "ko" }: { initialLang?: Lang }) {
  const [lang, setLang] = useState<Lang>(initialLang);

  useEffect(() => {
    const prev = document.documentElement.getAttribute("data-theme");
    document.documentElement.setAttribute("data-theme", "dark");
    return () => {
      if (prev) document.documentElement.setAttribute("data-theme", prev);
      else document.documentElement.removeAttribute("data-theme");
    };
  }, []);

  return (
    <>
      <Nav lang={lang} onLangChange={setLang} showHomeLinks={false} />
      <div className="aqc" style={{ paddingTop: "56px" }}>

        {/* HERO */}
        <section id="hero">
          <div className="hero-tag">Edge-Native Quality Execution Platform</div>
          <h1>
            Excel 검수 체크리스트의<br />
            시대를 <em>끝낸다</em>
          </h1>
          <p className="hero-sub">
            고부가가치 산업 설비의 출하 검수가 여전히 Excel과 수기 입력에 묶여 있다.<br />
            ActiveQC는 장비와 직접 통신하며 테스트를 능동적으로 실행하고,<br />
            위변조 불가능한 디지털 품질 자산을 생성한다.
          </p>
          <div className="hero-actions">
            <a href="#product" className="btn-primary">제품 살펴보기</a>
          </div>
          <div className="hero-stats">
            <div>
              <div className="hero-stat-num">5-Layer</div>
              <div className="hero-stat-label">구현 완료된 아키텍처</div>
            </div>
            <div>
              <div className="hero-stat-num">0건</div>
              <div className="hero-stat-label">휴먼 에러 (자동 판정)</div>
            </div>
            <div>
              <div className="hero-stat-num">1초</div>
              <div className="hero-stat-label">발주처 리포트 자동 생성</div>
            </div>
            <div>
              <div className="hero-stat-num">BDD</div>
              <div className="hero-stat-label">Gherkin 파싱 엔진 내장</div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* PROBLEM */}
        <section id="problem">
          <div className="section-label">Problem</div>
          <h2>
            출하 검수, 지금<br />
            <span>이렇게 하고 있습니다</span>
          </h2>
          <p className="sub">수억 원짜리 설비의 검수가 여전히 Excel 체크리스트와 수기 입력에 의존한다.</p>

          <div className="problem-excel-demo">
            <img src={`${IMG}/img-07-excel-checklist.gif`} alt="Excel 기반 수기 검수 체크리스트" loading="lazy" />
            <div className="problem-excel-caption">
              <span className="excel-badge">현재 현장</span>
              Excel 기반 수기 검수 체크리스트 — 셀 병합, 수동 입력, 서명란
            </div>
          </div>

          <table className="problem-table">
            <thead>
              <tr>
                <th>현재 방식</th>
                <th>문제</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Excel 체크리스트 수기 작성</td>
                <td>Pass만 남기고 실패 히스토리 전부 소실</td>
              </tr>
              <tr>
                <td>시스템 변경 시 절차서 전체 수작업 편집</td>
                <td>셀 병합, 섹션 번호 재설정, 섹션마다 모두 다른 구조</td>
              </tr>
              <tr>
                <td>구두 전달 · 암묵적 프로세스</td>
                <td>숙련자 없으면 업무 중단, 판정 기준이 사람마다 다름</td>
              </tr>
              <tr>
                <td>명시적 추적성 미확보</td>
                <td>채팅 · 전화 · Word · Excel · 이메일에 분산 — 이슈 발생 시 역추적 불가</td>
              </tr>
              <tr>
                <td>수작업 보고서 작성</td>
                <td>테스트 끝나도 보고서 정리에 추가 시간 소요 — 증거력 약화</td>
              </tr>
              <tr>
                <td>높은 커뮤니케이션 비용</td>
                <td>이슈 발생 시 유관 담당자에게 맥락 전파 비용 발생</td>
              </tr>
            </tbody>
          </table>

          <div className="conclusion-box">데이터가 남지 않으면 분석도, 개선도 없다</div>
        </section>

        <hr className="divider" />

        {/* APPROACH */}
        <section id="solution">
          <div className="section-label">Approach</div>
          <h2>
            두 가지 축으로<br />
            <span>접근합니다</span>
          </h2>
          <p className="sub">기록만 하는 시스템이 아니라, 반복 작업은 자동화하고 모든 수행 과정을 데이터로 남긴다.</p>

          <div className="approach-grid">
            <div className="approach-box data">
              <div className="approach-tag">축 1</div>
              <div className="approach-title">
                데이터화<br />— 남기고, 추적한다
              </div>
              <ul className="approach-items">
                <li>테스트 절차서 DB화 — Excel·Word에 흩어진 절차를 일원화</li>
                <li>수행 기록 전체 저장 — 정의(절차서)와 실행(수행)을 분리</li>
                <li>이슈·조치 이력 단일 시스템에서 관리</li>
                <li>Follow-up Action 추적 — 이슈 해결까지 맥락 보존</li>
              </ul>
            </div>
            <div className="approach-box auto">
              <div className="approach-tag">축 2</div>
              <div className="approach-title">
                자동화<br />— 반복 작업은 기계가 한다
              </div>
              <ul className="approach-items">
                <li>설비 직접 연결 — 신호 읽기/쓰기 자동</li>
                <li>Pass/Fail 자동 판정 — 검사자 편향 제거</li>
                <li>결과 보고서 자동 생성 — 버튼 하나로 발주처 제출용 DOCX</li>
                <li>Cloud → Edge 절차서 배포 — 어떤 현장도 동일한 기준 적용</li>
              </ul>
            </div>
          </div>

          <div className="approach-result">
            <strong>결과</strong> — 모든 테스트 과정이 기록되고, 반복 작업은 자동화됩니다
          </div>

          {/* BDD Execution Pipeline */}
          <div className="bdd-pipeline">
            <div className="section-label" style={{ marginBottom: "20px" }}>BDD 실행 파이프라인</div>
            <div className="bdd-flow">
              <div className="bdd-node bdd-scenario">
                <div className="bdd-node-num">01</div>
                <div className="bdd-node-name">Gherkin 시나리오</div>
                <div className="bdd-node-meta">Given / When / Then</div>
              </div>
              <div className="bdd-conn">→</div>
              <div className="bdd-node bdd-engine">
                <div className="bdd-node-num">02</div>
                <div className="bdd-node-name">BDD 파싱 엔진</div>
                <div className="bdd-node-meta">Step 정의 자동 바인딩</div>
              </div>
              <div className="bdd-conn">→</div>
              <div className="bdd-node bdd-driver">
                <div className="bdd-node-num">03</div>
                <div className="bdd-node-name">Protocol Driver</div>
                <div className="bdd-node-meta">Modbus TCP · MQTT</div>
              </div>
              <div className="bdd-conn">→</div>
              <div className="bdd-node bdd-device">
                <div className="bdd-node-num">04</div>
                <div className="bdd-node-name">PLC / 설비</div>
                <div className="bdd-node-meta">명령 전송 · 응답 수집</div>
              </div>
              <div className="bdd-conn">→</div>
              <div className="bdd-node bdd-verdict">
                <div className="bdd-node-num">05</div>
                <div className="bdd-node-name">Pass/Fail 판정</div>
                <div className="bdd-node-meta">자동 판정 · DB 저장</div>
              </div>
            </div>
            <div className="bdd-example">
              <div className="bdd-example-label">시나리오 예시 — 속도 제어 검증</div>
              <div className="bdd-code">
                <div><span className="gk-given">Given</span><span className="gk-text"> 설비가 가동 중이고 현재 속도가 0 rpm 일 때</span></div>
                <div><span className="gk-when">When </span><span className="gk-text"> 속도 명령 1200 rpm 을 Modbus reg 0x0031 에 전송한다</span></div>
                <div><span className="gk-then">Then </span><span className="gk-text"> Modbus reg 0x0032 응답값이 1200 ±5% 이내여야 한다</span></div>
              </div>
              <div className="bdd-result-row">
                <span className="bdd-pass">✓ PASS</span>
                <span className="bdd-result-val">실측값 1195 rpm — 허용 오차 이내 → 판정 통과, DB 저장</span>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* SYSTEM */}
        <section id="product">
          <div className="section-label">System</div>
          <h2>
            OQC Manager + OQC Edge<br />
            <span>2-Tier 아키텍처</span>
          </h2>
          <p className="sub">
            Cloud에서 절차를 관리하고, 현장 PC에서 장비와 직접 통신하며 테스트를 실행한다.
            기획서가 아닌 실제 구동 중인 시스템이다.
          </p>

          <div className="sys-wrap">
            <div className="sys-box manager" style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <div style={{ flexShrink: 0, background: "#fff", borderRadius: "10px", padding: "10px 12px" }}>
                <img
                  src={`${IMG}/oqc-manager-logo.png`}
                  alt="OQC Manager"
                  style={{ height: "128px", width: "128px", objectFit: "contain", display: "block" }}
                />
              </div>
              <div>
                <div className="sys-tag">Cloud · OQC Manager</div>
                <div className="sys-name">절차 관리 · 통계 · 보고서</div>
                <ul className="sys-items">
                  <li>테스트 절차서 생성 · 편집 · 관리</li>
                  <li>전체 테스트 통계 대시보드</li>
                  <li>발주처용 DOCX 보고서 자동 생성</li>
                  <li>Edge 설치 패키지 배포</li>
                  <li>사용자 권한 관리 (RBAC 5역할)</li>
                </ul>
              </div>
            </div>
            <div className="sys-box edge" style={{ display: "flex", gap: "24px", alignItems: "center" }}>
              <div style={{ flexShrink: 0, background: "#fff", borderRadius: "10px", padding: "10px 12px" }}>
                <img
                  src={`${IMG}/oqc-edge-logo.png`}
                  alt="OQC Edge"
                  style={{ height: "128px", width: "128px", objectFit: "contain", display: "block" }}
                />
              </div>
              <div>
                <div className="sys-tag">현장 PC · OQC Edge</div>
                <div className="sys-name">테스트 실행 · 설비 연결</div>
                <ul className="sys-items">
                  <li>절차서 다운로드 후 현장 실행</li>
                  <li>테스트 수행 — Pass / Fail 입력 + 이미지 첨부</li>
                  <li>실제 설비 연결 · 신호 수집</li>
                  <li>결과 서버 업로드</li>
                  <li>네트워크 단절 시에도 독립 실행</li>
                </ul>
              </div>
            </div>
          </div>

          <div className="sys-connector">↕ 산업용 통신 프로토콜 — 실제 설비 직결</div>

          {/* Architecture flow diagram */}
          <div className="arch-diagram">
            <div className="arch-row">
              <div className="arch-node arch-client">Browser / React SPA</div>
            </div>
            <div className="arch-edge-line">
              <span className="arch-edge-label">REST API</span>
            </div>
            <div className="arch-row">
              <div className="arch-node arch-server">
                <div className="arch-node-title">FastAPI Server</div>
                <div className="arch-node-sub">PostgreSQL · RBAC · 카탈로그 관리 · 보고서 생성</div>
              </div>
            </div>
            <div className="arch-edge-line">
              <span className="arch-edge-label">WebSocket / Sync</span>
            </div>
            <div className="arch-row">
              <div className="arch-node arch-edge-node">
                <div className="arch-node-title">OQC Edge Agent</div>
                <div className="arch-node-sub">현장 PC · BDD 시나리오 실행 · Offline-first</div>
              </div>
            </div>
            <div className="arch-row arch-proto-row">
              <div className="arch-proto-branch">
                <div className="arch-proto-line arch-proto-left" />
                <span className="arch-proto-label">Modbus TCP</span>
              </div>
              <div className="arch-proto-branch">
                <div className="arch-proto-line arch-proto-right" />
                <span className="arch-proto-label">MQTT</span>
              </div>
            </div>
            <div className="arch-row">
              <div className="arch-node arch-device">
                <div className="arch-node-title">PLC / Controller</div>
                <div className="arch-node-sub">설비 신호 읽기·쓰기 · 자동 판정 · 실시간 계측</div>
              </div>
            </div>
          </div>

          <div style={{ marginBottom: "48px", borderRadius: "12px", overflow: "hidden", border: "1px solid var(--border)" }}>
            <img
              src={`${IMG}/euv-equipment.jpg`}
              alt="실제 산업 설비"
              style={{ width: "100%", display: "block", maxHeight: "320px", objectFit: "cover" }}
            />
            <div style={{ background: "var(--card)", padding: "12px 20px", fontSize: "0.82rem", color: "var(--muted)" }}>
              <span style={{
                fontSize: "0.68rem", fontWeight: 700, letterSpacing: "0.08em",
                padding: "2px 8px", borderRadius: "4px",
                background: "rgba(100,116,139,0.15)", color: "var(--dim)",
                border: "1px solid rgba(100,116,139,0.3)", marginRight: "8px"
              }}>실제 설비</span>
              고부가가치 산업 설비 — ActiveQC가 직접 연결하여 검수를 자동화합니다
            </div>
          </div>

          {/* Edge-Server Sync Diagram */}
          <div className="sync-diag">
            <div className="section-label" style={{ marginBottom: "20px" }}>Edge-Server 동기화 시퀀스</div>
            <div className="sync-three">
              {/* Cloud column */}
              <div className="sync-col sync-col-cloud">
                <div className="sync-col-header">Cloud Manager</div>
                <ul className="sync-col-items">
                  <li>카탈로그 버전 관리</li>
                  <li>절차서 배포 · 업데이트</li>
                  <li>결과 수신 · 대시보드</li>
                  <li>DOCX 보고서 자동 생성</li>
                </ul>
              </div>

              {/* Center arrows */}
              <div className="sync-center">
                <div className="sync-msg sync-msg-down">
                  <div className="sync-msg-line" />
                  <div className="sync-msg-arrow-r">▶</div>
                  <div className="sync-msg-label">절차서 배포</div>
                  <div className="sync-msg-sub">테스트 카탈로그 · 시나리오 Push</div>
                </div>

                <div className="sync-offline-note">
                  <div className="sync-offline-icon">⊘</div>
                  <div>
                    <div className="sync-offline-title">네트워크 단절</div>
                    <div className="sync-offline-desc">Edge 로컬 캐시로 독립 실행 유지</div>
                  </div>
                </div>

                <div className="sync-msg sync-msg-up">
                  <div className="sync-msg-arrow-l">◀</div>
                  <div className="sync-msg-line" />
                  <div className="sync-msg-label">결과 동기화</div>
                  <div className="sync-msg-sub">재연결 시 자동 sync · 결과 · 증빙 · 타임스탬프</div>
                </div>
              </div>

              {/* Edge column */}
              <div className="sync-col sync-col-edge">
                <div className="sync-col-header">Edge Agent<br /><small>현장 PC</small></div>
                <ul className="sync-col-items">
                  <li>절차서 로컬 캐시</li>
                  <li>BDD 시나리오 실행</li>
                  <li>설비 직결 · 자동 판정</li>
                  <li className="sync-offline-item">오프라인 독립 실행</li>
                </ul>
              </div>
            </div>
          </div>

          {/* 테스트 케이스 분류 */}
          <div className="section-label" style={{ marginBottom: "20px" }}>테스트 케이스 분류</div>
          <h3 style={{ fontSize: "1.5rem", fontWeight: 800, marginBottom: "8px" }}>
            자동화 수준에 따라 <span style={{ color: "var(--cyan)" }}>3단계</span>로 분류됩니다
          </h3>
          <p style={{ color: "var(--dim)", fontSize: "0.9rem", marginBottom: "28px" }}>
            장비 종류와 검수 항목에 따라 완전자동 · 반자동 · 수동을 혼용합니다.
          </p>

          <table className="test-table">
            <thead>
              <tr>
                <th>유형</th>
                <th>방법</th>
                <th>예시</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><span className="test-type-badge badge-auto">완전 자동</span></td>
                <td>장비에 명령 전송 → 응답 자동 판정</td>
                <td>설비 기동/정지, 속도 설정, 계측값 자동 확인</td>
              </tr>
              <tr>
                <td><span className="test-type-badge badge-semi">반자동</span></td>
                <td>설비 값 읽기 + 현장 트리거 필요</td>
                <td>계측 시작을 사람이 트리거 → 이후 수집·판정 자동</td>
              </tr>
              <tr>
                <td><span className="test-type-badge badge-manual">수동</span></td>
                <td>육안 · 계측기 검사 후 기록</td>
                <td>명판, 누수 확인, 라벨 등 외관 점검</td>
              </tr>
            </tbody>
          </table>

          <div className="test-note">
            <strong>완전자동 + 반자동</strong> = 데이터 자동 수집 + 자동 판정 &nbsp;/&nbsp;
            <strong>수동</strong> = 체계적 기록 + 이미지 첨부 — 어떤 방식이든 모든 결과가 DB에 남는다
          </div>

          {/* 실제 화면 */}
          <div className="demo-section">
            <div className="demo-section-label">실제 구동 화면 — 2026.04.20 GM·임원 현장 데모</div>
            <div className="demo-grid">
              <div className="demo-item">
                <img src={`${IMG}/img-01-manager-catalog.gif`} alt="Manager 카탈로그 편집" loading="lazy" />
                <div className="demo-caption">
                  <span className="demo-badge badge-manager">Manager</span>
                  테스트 카탈로그 편집 · Cloud 배포
                </div>
              </div>
              <div className="demo-item">
                <img src={`${IMG}/img-02-edge-execution.gif`} alt="Edge 테스트 실행" loading="lazy" />
                <div className="demo-caption">
                  <span className="demo-badge badge-edge">Edge</span>
                  현장 테스트 실행 · Pass/Fail 판정
                </div>
              </div>
              <div className="demo-item">
                <img src={`${IMG}/img-03-docx-report.gif`} alt="DOCX 리포트 자동 생성" loading="lazy" />
                <div className="demo-caption">
                  <span className="demo-badge badge-manager">Manager</span>
                  발주처용 DOCX 리포트 자동 생성
                </div>
              </div>
              <div className="demo-item">
                <img src={`${IMG}/img-05-06-edge-autotest-running.gif`} alt="Gherkin 자동화 테스트" loading="lazy" />
                <div className="demo-caption">
                  <span className="demo-badge badge-edge">Edge</span>
                  Gherkin 시나리오 → 장비 직결 자동 테스트
                </div>
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* BEFORE / AFTER */}
        <section>
          <div className="section-label">Before / After</div>
          <h2>
            도입 전후,<br />
            <span>무엇이 달라지나</span>
          </h2>
          <p className="sub">Excel 기반 수기 검수와 ActiveQC 도입 후의 차이.</p>

          <table className="ba-table">
            <thead>
              <tr>
                <th></th>
                <th className="before">이전 (Excel 기반)</th>
                <th className="after">ActiveQC 이후</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>기록 방식</td>
                <td className="before-col">Excel · 기억에 의존</td>
                <td className="after-col">모든 수행 기록 DB 저장</td>
              </tr>
              <tr>
                <td>판정 기준</td>
                <td className="before-col">검사자마다 다른 판정</td>
                <td className="after-col">자동 판정 기준 일관 적용</td>
              </tr>
              <tr>
                <td>보고서 생성</td>
                <td className="before-col">수작업, 추가 시간 소요</td>
                <td className="after-col">버튼 하나로 DOCX 즉시 생성</td>
              </tr>
              <tr>
                <td>이슈 추적</td>
                <td className="before-col">이메일 · 메모에 분산</td>
                <td className="after-col">단일 시스템에서 이슈 · 조치 추적</td>
              </tr>
              <tr>
                <td>데이터 분석</td>
                <td className="before-col">데이터 없음 → 분석 불가</td>
                <td className="after-col">누적 데이터 → 통계 · AI 분석 가능</td>
              </tr>
            </tbody>
          </table>
        </section>

        <hr className="divider" />

        {/* ROADMAP */}
        <section>
          <div className="section-label">Roadmap</div>
          <h2>
            지금이 시작입니다<br />
            <span>향후 확장 계획</span>
          </h2>
          <p className="sub">실제 현장 검증을 기반으로 단계적으로 확장한다.</p>

          <div className="roadmap-list">
            <div className="roadmap-item">
              <div className="roadmap-num">01</div>
              <div className="roadmap-text">
                <strong>현장 배포 · 피드백 반영 · 지속 개선</strong>
                현장 데이터를 기반으로 UI/UX 고도화, 안정성 개선을 지속한다.
              </div>
            </div>
            <div className="roadmap-item">
              <div className="roadmap-num">02</div>
              <div className="roadmap-text">
                <strong>추가 설비 라인 확대 적용</strong>
                검증된 플랫폼을 추가 설비 라인으로 수평 확장한다.
              </div>
            </div>
            <div className="roadmap-item">
              <div className="roadmap-num">03</div>
              <div className="roadmap-text">
                <strong>데이터 누적 → 통계 분석</strong>
                쌓인 테스트 결과에서 크리티컬 패스와 패턴을 발견해 예방 정비 인사이트를 제공한다.
              </div>
            </div>
            <div className="roadmap-item">
              <div className="roadmap-num">04</div>
              <div className="roadmap-text">
                <strong>AI 시나리오 작성 보조 · 자동 요약</strong>
                베테랑 엔지니어의 암묵지를 AI가 시나리오로 변환하고, 결과 요약 리포트를 자동 생성한다.
              </div>
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* TRACTION */}
        <section id="traction">
          <div className="section-label">Traction</div>
          <h2>
            기획서가 아니라<br />
            <span>실제로 동작한다</span>
          </h2>
          <p className="sub">
            실제 산업 설비와 직결하여 검증된 구현체. GM·임원 앞에서 현장 라이브 데모를 완료했다.
          </p>

          <div className="traction-grid">
            <div className="traction-card">
              <div className="traction-check">✅</div>
              <div className="traction-icon">🏗️</div>
              <div className="traction-label">5-Layer 아키텍처<br />구현 완료</div>
            </div>
            <div className="traction-card">
              <div className="traction-check">✅</div>
              <div className="traction-icon">⚙️</div>
              <div className="traction-label">BDD/Gherkin<br />파싱 엔진 구현</div>
            </div>
            <div className="traction-card">
              <div className="traction-check">✅</div>
              <div className="traction-icon">🔌</div>
              <div className="traction-label">설비 직결<br />자동 판정 엔진</div>
            </div>
            <div className="traction-card">
              <div className="traction-check">✅</div>
              <div className="traction-icon">🔐</div>
              <div className="traction-label">RBAC 5역할<br />권한 시스템</div>
            </div>
          </div>

          <div className="demo-dashboard">
            <img src={`${IMG}/img-04-manager-dashboard.jpg`} alt="Manager 대시보드 — 전체 테스트 현황" loading="lazy" />
            <div className="demo-dashboard-caption">
              <span className="demo-badge badge-manager">Manager</span>
              실시간 테스트 현황 대시보드 — 실제 현장 운영 화면
            </div>
          </div>
        </section>

        <hr className="divider" />

        {/* CONTACT */}
        <section id="contact" style={{ padding: "0 48px" }}>
          <div className="cta-box">
            <div className="section-label" style={{ textAlign: "center", marginBottom: "24px" }}>Contact</div>
            <a href="mailto:pjy8412@gmail.com" className="cta-email">pjy8412@gmail.com</a>
          </div>
        </section>

        {/* FOOTER */}
        <footer>
          <div className="footer-logo">ActiveQC</div>
          <div>Kill the Excel Checklist. Own the Quality Data.</div>
          <div>© 2026 ActiveQC</div>
        </footer>

      </div>
    </>
  );
}
