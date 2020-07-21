import request from '@/utils/request'

export function addManufacturer(name_en, name_cn, gmc_report_type, gmc_report_url,
  description, created_by, creation_date, last_update_by, last_update_date, call_cnt, remark, sts_cd, user_id) {
  return request({
    url: 'manufacturer/addManufacturer',
    method: 'post',
    data: {
      name_en,
      name_cn,
      gmc_report_type ,
      gmc_report_url,
      description,
      created_by,
      creation_date,
      last_update_by,
      last_update_date,
      call_cnt, remark,
      sts_cd,
      user_id
    }
  })
}

export function updateManufacturer(man_id,name_en, name_cn, gmc_report_type, gmc_report_url,
  description, created_by, creation_date, last_update_by, last_update_date, call_cnt, remark, sts_cd, user_id) {
  return request({
    url: 'manufacturer/UpdateManufacturer',
    method: 'post',
    data: {
      man_id,
      name_en,
      name_cn,
      gmc_report_type ,
      gmc_report_url,
      description,
      created_by,
      creation_date,
      last_update_by,
      last_update_date,
      call_cnt, remark,
      sts_cd,
      user_id
    }
  })
}


export function deleteBrand(brd_id) {
  return request({
    url: 'brand/deleteBrand',
    method: 'post',
    data: {
      brd_id
    }
  })
}

export function addBrand(man_id,name_en,name_cn,
  img_url) {
  return request({
    url: 'brand/addBrand',
    method: 'post',
    data: {
      man_id,
      name_en,
      name_cn,
      img_url
    }
  })
}


export function updateBrand(brd_id,man_id,name_en,name_cn, img_url) {
  return request({
    url: 'brand/updateBrand',
    method: 'post',
    data: {
      brd_id,
      man_id,
      name_en,
      name_cn,
      img_url
    }
  })
}


export function getManByFilter (man_id,name_en, name_cn, gmc_report_type, gmc_report_url,
  description, created_by, creation_date, last_update_by, last_update_date, call_cnt, remark, sts_cd, user_id) {
  return request({
    url: 'manufacturer/getManByFilter',
    method: 'post',
    data: {
      man_id,
      name_en,
      name_cn,
      gmc_report_type ,
      gmc_report_url,
      description,
      created_by,
      creation_date,
      last_update_by,
      last_update_date,
      call_cnt, remark,
      sts_cd,
      user_id
    }
  })
}


export function getBrandByFilter(data) {
  return request({
    url: 'brand/getBrandByFilter',
    method: 'post',
    data: data
     
  })
}

export function deleteAllBrand(data) {
  return request({
    url: 'brand/deleteAllBrand',
    method: 'post',
    data: data
     
  })
}
