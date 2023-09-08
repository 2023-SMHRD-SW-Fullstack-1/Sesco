package com.smhrd.sesco.service;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.google.gson.JsonObject;
import com.smhrd.sesco.domain.HtSurveyDetail;
import com.smhrd.sesco.domain.HtSurveyTip;
import com.smhrd.sesco.mapper.HtSurveyMapper;

@Service
public class HtSurveyService {

	@Autowired
	private HtSurveyMapper surveyMapper;
	
	public List<HtSurveyDetail> viewSurveyDetail(HtSurveyDetail svDetail) {
		
		return surveyMapper.viewSurveyAgeCheckList(svDetail);
	}

	public List<HtSurveyTip> viewSurveyAgeTip(HtSurveyTip svTip) {
		
		return surveyMapper.viewSurveyAgeTip(svTip);
	}	

}
