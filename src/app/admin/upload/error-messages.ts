export const ERROR_MESSAGES_KO: Record<string, string> = {
  unauthorized: "토큰이 잘못됐거나 누락됐어요.",
  server_misconfigured:
    "서버에 관리자 키가 설정되지 않았습니다. 배포 환경변수를 확인하세요.",
  bad_form: "필수 입력값이 누락됐습니다.",
  invalid_slug: "슬러그 형식이 잘못됐어요. 영소문자/숫자/하이픈, 1~64자.",
  slug_locked: "이 슬러그는 보호된 라우트라 업로드할 수 없어요.",
  file_too_large: "파일이 5MB를 초과합니다.",
  bad_file_type: ".html 파일만 업로드할 수 있어요.",
  bad_file_content: "HTML 파일 형식이 아닙니다 (첫 비공백 바이트가 '<' 가 아님).",
  storage_check_failed: "Blob 스토리지 조회 실패. 잠시 후 다시 시도하세요.",
  storage_put_failed: "Blob 업로드 실패. 잠시 후 다시 시도하세요.",
};

export function messageForCode(code: string): string {
  return ERROR_MESSAGES_KO[code] ?? `알 수 없는 에러 (${code})`;
}
