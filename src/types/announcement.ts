export interface KStartupAnnouncement {
  pbanc_sn: number;
  biz_pbanc_nm: string;
  pbanc_ntrp_nm: string;
  supt_regin: string;
  aply_trgt: string;
  aply_trgt_ctnt: string | null;
  pbanc_rcpt_bgng_dt: string;
  pbanc_rcpt_end_dt: string;
  rcrt_prgs_yn: string;
  biz_gdnc_url: string | null;
  detl_pg_url: string | null;
  prch_cnpl_no: string | null;
  aply_mthd_onli_rcpt_istc: string | null;
  supt_biz_clsfc: string;
  intg_pbanc_yn: string;
  biz_enyy: string | null;
  biz_trgt_age: string | null;
  pbanc_ctnt: string | null;
}

export interface KStartupApiResponse {
  currentCount: number;
  matchCount: number;
  page: number;
  perPage: number;
  totalCount: number;
  data: KStartupAnnouncement[];
}

export type RecruitmentFilter = "all" | "recruiting" | "closed";
