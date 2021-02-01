exports.searchCompanyMemberSql = function (content) {
  return `
    SELECT member_id,
       company_name,
       company_type,
       CASE WHEN company_type = '1' THEN '国有'
           WHEN company_type = '2' THEN '集体'
           WHEN company_type = '3' THEN '中外合资'
           WHEN company_type = '4' THEN '外资'
           WHEN company_type = '5' THEN '私营'
           WHEN company_type = '6' THEN '其他'
       END AS company_type_text,
       company_leader,
       company_owner,
       cellphone,
       business_license_number,
       business_license_picture,
       establish_date,
       company_address,
       company_email,
       company_telephone,
       company_fax,
       company_home_page,
       contacts_name,
       contacts_title,
       contacts_tell,
       contacts_cellphone,
       contacts_email,
       main_business,
       staff_total,
       floor_space,
       turnover,
       fixed_assets,
       data_status,
       CASE WHEN data_status = 'P' THEN '待审批'
           WHEN data_status = 'Y' THEN '审批通过'
           WHEN data_status = 'N' THEN '审批未通过'
       END AS data_status_text,
       create_user,
       DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time,
       update_user,
       DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') AS update_time
    FROM \`ssl\`.member_company
    WHERE business_license_number = '${content}' OR company_name = '${content}';`;
};
exports.searchPersonalMemberSql = function (content) {
  return `
    SELECT member_id,
         full_name,
         sex,
         CASE WHEN sex = 'M' THEN '男'
           WHEN sex = 'F' THEN '女'
         END AS sex_text,
         politics_type,
         CASE WHEN politics_type = '1' THEN '群众'
           WHEN politics_type = '2' THEN '中共党员'
         END AS politics_type_text,
         education_level,
         CASE WHEN education_level = '1' THEN '初中及以下'
           WHEN education_level = '2' THEN '中专'
           WHEN education_level = '3' THEN '高中'
           WHEN education_level = '4' THEN '大专'
           WHEN education_level = '5' THEN '本科'
           WHEN education_level = '6' THEN '硕士'
           WHEN education_level = '7' THEN '博士'
         END AS education_level_text,
         wei_chat,
         email,
         cellphone,
         telephone,
         work_unit,
         title,
         home_address,
         identity_card_no,
         resumes,
         data_status,
         CASE WHEN data_status = 'P' THEN '待审批'
             WHEN data_status = 'Y' THEN '审批通过'
             WHEN data_status = 'N' THEN '审批未通过'
         END AS data_status_text,
         create_user,
         DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time,
         update_user,
         DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') AS update_time
    FROM \`ssl\`.member_personage
    WHERE cellphone = '${content}' OR identity_card_no = '${content}';`;
};

exports.searchCompanyMemberCertificateNumber = function () {
  return 'SELECT IFNULL(MAX(certificate_number), 0) + 1 AS certificate_number FROM ssl.member_company;';
};
exports.searchPersonalMemberCertificateNumber = function () {
  return 'SELECT IFNULL(MAX(certificate_number), 0) + 1 AS certificate_number FROM ssl.member_personage;';
};

exports.checkCompanyMemberCertificateNumber = function (certificateNumber) {
  return `SELECT count(1) as total_count from \`ssl\`.member_company WHERE certificate_number = ${certificateNumber};`;
};

exports.checkPersonalMemberCertificateNumber = function (certificateNumber) {
  return `SELECT count(1) as total_count from \`ssl\`.member_personage WHERE certificate_number = ${certificateNumber};`;
};

exports.searchCompanyMemberByIDSql = function (memberID) {
  return `
    SELECT member_id,
       company_name,
       company_name_en,
       company_type,
       CASE WHEN company_type = '1' THEN '国有'
           WHEN company_type = '2' THEN '集体'
           WHEN company_type = '3' THEN '中外合资'
           WHEN company_type = '4' THEN '外资'
           WHEN company_type = '5' THEN '私营'
           WHEN company_type = '6' THEN '其他'
       END AS company_type_text,
       company_leader,
       company_owner,
       cellphone,
       business_license_number,
       business_license_picture,
       establish_date,
       company_address,
       company_email,
       company_telephone,
       company_fax,
       company_home_page,
       contacts_name,
       contacts_title,
       contacts_tell,
       contacts_cellphone,
       contacts_email,
       main_business,
       staff_total,
       floor_space,
       turnover,
       fixed_assets,
       data_status,
       certificate_number,
       CASE WHEN data_status = 'P' THEN '待审批'
           WHEN data_status = 'Y' THEN '审批通过'
           WHEN data_status = 'N' THEN '审批未通过'
       END AS data_status_text,
       create_user,
       DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time,
       update_user,
       DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') AS update_time
    FROM \`ssl\`.member_company
    WHERE member_id = '${memberID}';`;
};
exports.searchPersonalMemberByIDSql = function (memberID) {
  return `
    SELECT member_id,
         full_name,
         full_name_en,
         sex,
         CASE WHEN sex = 'M' THEN '男'
           WHEN sex = 'F' THEN '女'
         END AS sex_text,
         politics_type,
         CASE WHEN politics_type = '1' THEN '群众'
           WHEN politics_type = '2' THEN '中共党员'
         END AS politics_type_text,
         education_level,
         CASE WHEN education_level = '1' THEN '初中及以下'
           WHEN education_level = '2' THEN '中专'
           WHEN education_level = '3' THEN '高中'
           WHEN education_level = '4' THEN '大专'
           WHEN education_level = '5' THEN '本科'
           WHEN education_level = '6' THEN '硕士'
           WHEN education_level = '7' THEN '博士'
         END AS education_level_text,
         wei_chat,
         email,
         cellphone,
         telephone,
         work_unit,
         title,
         home_address,
         identity_card_no,
         resumes,
         data_status,
         certificate_number,
         CASE WHEN data_status = 'P' THEN '待审批'
             WHEN data_status = 'Y' THEN '审批通过'
             WHEN data_status = 'N' THEN '审批未通过'
         END AS data_status_text,
         create_user,
         DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time,
         update_user,
         DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') AS update_time
    FROM \`ssl\`.member_personage
    WHERE member_id = '${memberID}';`;
};

exports.searchCompanyMemberListSql = function (startIndex, pageSize, content, status) {
  let sql = `
  SELECT member_id,
       company_name AS member_name,
       'C' AS member_type,
       company_type,
       CASE WHEN company_type = '1' THEN '国有'
           WHEN company_type = '2' THEN '集体'
           WHEN company_type = '3' THEN '中外合资'
           WHEN company_type = '4' THEN '外资'
           WHEN company_type = '5' THEN '私营'
           WHEN company_type = '6' THEN '其他'
       END AS company_type_text,
       company_leader,
       company_owner,
       cellphone,
       business_license_number,
       business_license_picture,
       establish_date,
       company_address,
       company_email,
       company_telephone,
       company_fax,
       company_home_page,
       contacts_name,
       contacts_title,
       contacts_tell,
       contacts_cellphone,
       contacts_email,
       main_business,
       staff_total,
       floor_space,
       turnover,
       fixed_assets,
       certificate_number,
       data_status,
       CASE WHEN data_status = 'P' THEN '待审批'
           WHEN data_status = 'Y' THEN '审批通过'
           WHEN data_status = 'N' THEN '审批未通过'
       END AS data_status_text,
       create_user,
       DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time,
       update_user,
       DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') AS update_time
    FROM \`ssl\`.member_company
    WHERE 1=1
  `;

  if (content.length > 0) {
    sql = sql + ` AND business_license_number = '${content}'`
  }
  if (status !== 'A') {
    sql = sql + ` AND data_status = '${status}'`
  }
  sql = sql + ` ORDER BY data_status, create_time DESC LIMIT ${startIndex}, ${pageSize}`;
  return sql;
};
exports.searchPersonalMemberListSql = function (startIndex, pageSize, content, status) {
  let sql = `
  SELECT member_id,
         full_name AS member_name,
         'P' AS member_type,
         sex,
         CASE WHEN sex = 'M' THEN '男'
           WHEN sex = 'F' THEN '女'
         END AS sex_text,
         politics_type,
         CASE WHEN politics_type = '1' THEN '群众'
           WHEN politics_type = '2' THEN '中共党员'
         END AS politics_type_text,
         education_level,
         CASE WHEN education_level = '1' THEN '初中及以下'
           WHEN education_level = '2' THEN '中专'
           WHEN education_level = '3' THEN '高中'
           WHEN education_level = '4' THEN '大专'
           WHEN education_level = '5' THEN '本科'
           WHEN education_level = '6' THEN '硕士'
           WHEN education_level = '7' THEN '博士'
         END AS education_level_text,
         wei_chat,
         email,
         cellphone,
         telephone,
         work_unit,
         title,
         home_address,
         identity_card_no,
         resumes,
         certificate_number,
         data_status,
         CASE WHEN data_status = 'P' THEN '待审批'
             WHEN data_status = 'Y' THEN '审批通过'
             WHEN data_status = 'N' THEN '审批未通过'
         END AS data_status_text,
         create_user,
         DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time,
         update_user,
         DATE_FORMAT(update_time, '%Y-%m-%d %H:%i:%s') AS update_time
    FROM \`ssl\`.member_personage
    WHERE 1 = 1
  `;
  if (content.length > 0) {
    sql = sql + ` AND cellphone = '${content}'`;
  }
  if (status !== 'A') {
    sql = sql + ` AND data_status = '${status}'`
  }
  sql = sql + ` ORDER BY data_status, create_time DESC LIMIT ${startIndex}, ${pageSize}`;
  return sql;
};

exports.insertCompanyMemberSql = function () {
  return `
  INSERT INTO \`ssl\`.member_company
  (
      company_name,
      company_name_en,
      company_type,
      establish_date,
      company_leader,
      company_owner,
      cellphone,
      company_telephone,
      company_email,
      company_fax,
      company_home_page,
      company_address,
      business_license_number,
      business_license_picture,
      main_business,
      staff_total,
      floor_space,
      turnover,
      fixed_assets,
      contacts_name,
      contacts_title,
      contacts_tell,
      contacts_cellphone,
      contacts_email
  )
  VALUES
  (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
  );`;
}
exports.insertPersonalMemberSql = function () {
  return `
  INSERT INTO \`ssl\`.member_personage
  (
      full_name,
      full_name_en,
      sex,
      politics_type,
      education_level,
      wei_chat,
      email,
      cellphone,
      telephone,
      work_unit,
      title,
      home_address,
      identity_card_no,
      resumes
  )
  VALUES
  (
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?,
      ?
  );`;
};

exports.searchAdminSql = function (account, password) {
  return `
    SELECT admin_id, 
         account
    FROM \`ssl\`.admin
    WHERE account = '${account}'
    AND password = '${password}';
  `;
};
exports.searchApplyListSql = function (startIndex, pageSize, status) {
  if (status === 'A') {
    return `
        SELECT member_id,
              member_name,
             member_type,
             certificate_number,
             data_status,
             data_status_text,
             create_time
        FROM
        (
            SELECT member_id,
                   company_name AS member_name,
                   'C' AS member_type,
                   certificate_number,
                   data_status,
                   CASE WHEN data_status = 'P' THEN '待审批'
                        WHEN data_status = 'Y' THEN '审批通过'
                        WHEN data_status = 'N' THEN '审批未通过'
                   END AS data_status_text,
                   DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time
            FROM \`ssl\`.member_company
            UNION
            SELECT member_id,
                  full_name AS member_name,
               'P' AS member_type,
               certificate_number,
               data_status,
               CASE WHEN data_status = 'P' THEN '待审批'
                     WHEN data_status = 'Y' THEN '审批通过'
                     WHEN data_status = 'N' THEN '审批未通过'
               END AS data_status_text,
               DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time
            FROM \`ssl\`.member_personage
        ) a
        ORDER BY data_status, create_time DESC
        LIMIT ${startIndex}, ${pageSize};
        `;
  }

  return `
        SELECT member_id,
              member_name,
             member_type,
             certificate_number,
             data_status,
             data_status_text,
             create_time
        FROM
        (
            SELECT member_id,
                   company_name AS member_name,
                   'C' AS member_type,
                   certificate_number,
                   data_status,
                   CASE WHEN data_status = 'P' THEN '待审批'
                        WHEN data_status = 'Y' THEN '审批通过'
                        WHEN data_status = 'N' THEN '审批未通过'
                   END AS data_status_text,
                   DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time
            FROM \`ssl\`.member_company
            WHERE data_status = '${status}'
            UNION
            SELECT member_id,
                  full_name AS member_name,
               'P' AS member_type,
               certificate_number,
               data_status,
               CASE WHEN data_status = 'P' THEN '待审批'
                     WHEN data_status = 'Y' THEN '审批通过'
                     WHEN data_status = 'N' THEN '审批未通过'
               END AS data_status_text,
               DATE_FORMAT(create_time, '%Y-%m-%d %H:%i:%s') AS create_time
            FROM \`ssl\`.member_personage
            WHERE data_status = '${status}'
        ) a
        ORDER BY data_status, create_time DESC
        LIMIT ${startIndex}, ${pageSize};
        `;
};

exports.changeCompanyMemberStatusSql = function () {
  return `
    UPDATE \`ssl\`.member_company
    SET data_status = ?,
    certificate_number = ?
    WHERE member_id = ?;
  `;
};
exports.changePersonalMemberStatusSql = function () {
  return `
    UPDATE \`ssl\`.member_personage
    SET data_status = ?,
    certificate_number = ?
    WHERE member_id = ?;
  `;
};