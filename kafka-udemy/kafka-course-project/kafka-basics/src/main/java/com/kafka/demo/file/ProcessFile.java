package com.kafka.demo.file;

import org.apache.poi.ss.usermodel.Cell;
import org.apache.poi.ss.usermodel.Row;
import org.apache.poi.xssf.usermodel.XSSFSheet;
import org.apache.poi.xssf.usermodel.XSSFWorkbook;

import java.io.*;
import java.util.ArrayList;
import java.util.Iterator;
import java.util.List;

public class ProcessFile {

    public static void main(String[] args) throws IOException {
        List<List<String>> mainFileData = readDataFromFile("C:\\Users\\vignesh.m\\Downloads\\Test.xlsx");
        List<List<String>> conditionTypesData = readDataFromFile("C:\\Users\\vignesh.m\\Downloads\\Test1.xlsx");

       // System.out.println(mainFileData);

        List<List<String>> processedData = new ArrayList<>();
        processedData.add(List.of("Zone","Weight","Price","Type"));

        List<String> zones = getZones(mainFileData);
        int size = mainFileData.size();
        int index = 1;
        for(String zone:zones) {
            for (int i = 1; i < size; i++) {
                List<String> tempData = new ArrayList<>();
                tempData.add(zone);
                String weight = mainFileData.get(i).get(0);
                tempData.add(getWeight(weight));
                tempData.add(mainFileData.get(i).get(index));
                tempData.add(getConditionType(conditionTypesData,weight));
                processedData.add(tempData);
            }
            index++;
        }
        writeDataFile(processedData);
    }

    private static String getConditionType(List<List<String>> conditionTypesData, String weight) {
        int count = conditionTypesData.size();
        for(List<String> condition:conditionTypesData){
            if(weight.toLowerCase().contains(condition.get(0).toLowerCase())) return condition.get(1);
            if(count == 1) return condition.get(1);
            count--;
        }
        return "";
    }

    private static String getWeight(String weight) {
        try{
            return Integer.toString(Integer.parseInt(weight));
        }catch (NumberFormatException e){
            return "NA";
        }
    }

    private static List<String> getZones(List<List<String>> mainFileData) {
        List<String> zones = new ArrayList<>(mainFileData.get(0).size()-1);
        zones.addAll(mainFileData.get(0));
        zones.remove(0);
        return zones;
    }

    private static List<List<String>> readDataFromFile(String filePath) {
        List<List<String>> mainFileData = new ArrayList<>();
        try {
            File file = new File(filePath);
            FileInputStream fis = new FileInputStream(file);
            XSSFWorkbook wb = new XSSFWorkbook(fis);
            XSSFSheet sheet = wb.getSheetAt(0);

            for (Row row : sheet) {
                Iterator<Cell> cellIterator = row.cellIterator();
                List<String> tempRowList = new ArrayList<>();
                while (cellIterator.hasNext()) {
                    Cell cellData = cellIterator.next();

                    switch (cellData.getCellType()) {
                        case STRING:
                            tempRowList.add(cellData.getStringCellValue());
                            break;
                        case NUMERIC:
                            tempRowList.add(cellData.getNumericCellValue()%1 == 0 ? Integer.toString((int)cellData.getNumericCellValue()): Double.toString(cellData.getNumericCellValue()));
                            break;
                        case BOOLEAN:
                            tempRowList.add(Boolean.toString(cellData.getBooleanCellValue()));
                            break;
                    }
                }
                mainFileData.add(tempRowList);
            }
        }catch(Exception e) {
            e.printStackTrace();
        }
        return mainFileData;
    }

    private static void writeDataFile(List<List<String>> processedData) throws IOException {
        FileOutputStream out = new FileOutputStream(new File("D:\\SampleOutput\\demo.xlsx"));
        XSSFWorkbook workbook = new XSSFWorkbook();
        XSSFSheet sheet = workbook.createSheet("Employee Data");
        Iterator <List<String>>i = processedData.iterator();
        int rowNumber=0;
        while (i.hasNext()) {
            List<String> tempList = i.next();
            Iterator<String> tempIterator= tempList.iterator();
            Row row = sheet.createRow(rowNumber++);
            int cellNumber = 0;
            while (tempIterator.hasNext()) {
                String temp = tempIterator.next();
                Cell cell = row.createCell(cellNumber++);
                try{
                    cell.setCellValue(Double.parseDouble(temp));
                }catch (NumberFormatException e) {
                    cell.setCellValue(temp);
                }
            }
        }
        workbook.write(out);
        out.close();
        workbook.close();
    }
}

