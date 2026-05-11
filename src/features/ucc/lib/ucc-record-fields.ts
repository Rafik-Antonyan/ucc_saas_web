import type { UccRecord } from "@/features/ucc/types/ucc.types";

export function debtorCity(record?: UccRecord) {
  return record?.debtorCity ?? "";
}

export function debtorState(record?: UccRecord) {
  return record?.debtorState ?? record?.state ?? "";
}

export function debtorCounty(record?: UccRecord) {
  return record?.debtorCounty ?? record?.county ?? "";
}

export function debtorZip(record?: UccRecord) {
  return record?.debtorZipCode ?? record?.zip ?? "";
}

export function securedPartyName(record?: UccRecord) {
  return record?.securedPartyName ?? record?.securedParty ?? "";
}

export function fileNumber(record?: UccRecord) {
  return record?.fileNumber ?? record?.filingNumber ?? "";
}

export function collateralDescription(record?: UccRecord) {
  return record?.collateralDescription ?? record?.collateralText ?? "";
}

export function debtorAddress(record?: UccRecord) {
  return record?.debtorAddress ?? "";
}

export function debtorPhone(record?: UccRecord) {
  return record?.debtorPhoneNumber ?? "";
}
