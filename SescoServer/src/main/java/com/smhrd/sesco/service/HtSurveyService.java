package com.smhrd.sesco.service;

import java.util.ArrayList;
import java.util.List;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.jdbc.core.JdbcTemplate;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.google.gson.JsonObject;
import com.smhrd.sesco.domain.HtSurveyDetail;
import com.smhrd.sesco.domain.HtSurveyTip;
import com.smhrd.sesco.domain.Survey;
import com.smhrd.sesco.mapper.HtSurveyMapper;

@Service
public class HtSurveyService implements SurveyService {

	@Autowired
	private JdbcTemplate jdbcTemplate;

	@Autowired
	private HtSurveyMapper surveyMapper;

	public List<HtSurveyDetail> viewSurveyAgeCheckList(HtSurveyDetail svDetail) {

		return surveyMapper.viewSurveyAgeCheckList(svDetail);
	}

	public List<HtSurveyTip> viewSurveyAgeTip(HtSurveyTip svTip) {

		return surveyMapper.viewSurveyAgeTip(svTip);
	}

	@Override
	@Transactional
	public void saveSurvey(Survey survey) {
		// 설문 결과 저장
		String insertSurveySql = "INSERT INTO t_survey (sv_dt, hsv_seq, kid_seq) VALUES (NOW(), ?, ?)";
		jdbcTemplate.update(insertSurveySql, survey.getHsv_seq(), survey.getKid_seq());

		// 저장된 설문 결과의 sv_seq 가져오기
		String selectSvSeqSql = "SELECT sv_seq FROM t_survey WHERE kid_seq = ? ORDER BY sv_dt DESC LIMIT 1";
		String svSeq = jdbcTemplate.queryForObject(selectSvSeqSql, String.class, survey.getKid_seq());

		// SurveyDo 저장
		for (String value : survey.getTotalCheckList()) {
			String insertSurveyDoSql = "INSERT INTO t_survey_do (hsvd_seq, sv_seq) VALUES (?, ?)";
			jdbcTemplate.update(insertSurveyDoSql, value, svSeq);
		}
	}


	public List<HtSurveyDetail> preSurveyList(String kidSeq, int hsvSeq) {
		
		return surveyMapper.preSurveyList(kidSeq,hsvSeq);
	}

	

}
