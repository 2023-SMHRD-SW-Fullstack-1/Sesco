package com.smhrd.sesco.controller;

import java.util.List;
import java.util.Map;

import org.json.simple.JSONArray;
import org.json.simple.JSONObject;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PostMapping;
import org.springframework.web.bind.annotation.RequestBody;
import org.springframework.web.bind.annotation.RestController;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import com.smhrd.sesco.domain.HtSurveyDetail;
import com.smhrd.sesco.domain.HtSurveyTip;
import com.smhrd.sesco.service.HtSurveyService;

@RestController
@CrossOrigin("http://localhost:3000")
public class HtSurveyController {

	@Autowired
	private HtSurveyService htsurService;
	
	@PostMapping("/survey/agechecklist")
	public List<HtSurveyDetail> viewSurveyAgeCheckList(@RequestBody Map<String, Object> map) {
		int hsv_seq = Integer.parseInt(map.get("hsv_seq").toString());
		
		
		HtSurveyDetail svDetail = new HtSurveyDetail();
		svDetail.setHsv_seq(hsv_seq);
		
		return htsurService.viewSurveyDetail(svDetail);
		
	
	}
	
	
	@PostMapping("/survey/agetip")
	public List<HtSurveyTip> viewSurveyAgeTip(@RequestBody Map<String, Object> map) {
		int hsv_seq = Integer.parseInt(map.get("hsv_seq").toString());
		
		HtSurveyTip svTip = new HtSurveyTip();
		svTip.setHsv_seq(hsv_seq);
		
		return htsurService.viewSurveyAgeTip(svTip);
		
	
	}
	
	
	
}
