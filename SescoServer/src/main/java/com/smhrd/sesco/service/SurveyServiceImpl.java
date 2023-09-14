package com.smhrd.sesco.service;
import java.util.ArrayList;
import java.util.Date;
import java.util.Map;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.smhrd.sesco.domain.Survey;
import com.smhrd.sesco.mapper.HtSurveyMapper;

@Service
public class SurveyServiceImpl implements SurveyService {
    
  private final HtSurveyMapper surveyMapper;

  @Autowired
  public SurveyServiceImpl(HtSurveyMapper surveyMapper) {
      this.surveyMapper = surveyMapper;
  }

  @Override
  public void saveResult(Map<String, Object> map) {
     ArrayList<String> totalCheckList = (ArrayList<String>) map.get("totalCheckList");
     String kidSeq = map.get("kid_seq").toString();
     int hsvSeq = Integer.parseInt(map.get("hsv_seq").toString());

     // 필요한 로직 수행
     
     // 설문 결과 저장 처리를 위한 코드 작성
     
     for(String checkItem : totalCheckList) {
         // 각 체크 아이템에 대한 처리 로직 수행 예시:
         System.out.println("Processing check item: " + checkItem);
         // 추가적인 로직 수행 ...
         
         // MyBatis Mapper 호출하여 insert 작업 수행 후 자동으로 생성된 키 값을 받아옴.
         Survey survey = new Survey();
         survey.setSv_dt(new Date());
         survey.setHsv_seq(hsvSeq);
         survey.setKid_seq(kidSeq);
         
         
         // MyBatis Mapper 호출하여 insert 작업 수행 후 자동으로 생성된 키 값을 받아옴.
       	surveyMapper.insertSurvey(survey);

       	// 즉각적으로 반환된 키 값 확인 가능 
       	String svSeq = survey.getSv_seq();
       	System.out.println("Inserted sv_Seq: " + svSeq);

    
     }
     
   }
}
