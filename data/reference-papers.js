'use strict';

const buExamPapers = (() => {
  const mc=(prompt,options,answer,explanation)=>({type:'mcq',prompt,options,answer,explanation});
  const sa=(prompt,answer,explanation,answerText)=>({type:'short',prompt,answer,answerText,explanation});
  const ds=(prompt,rows)=>({type:'tf',prompt,statements:rows.map(([text,answer,explanation])=>({text,answer,explanation}))});
  const paper=(grade,school,source,scope,minutes,questions)=>({
    id:'mid1-school-g'+grade,grade,title:'Giữa kỳ I · Theo đề '+school,source,scope,minutes,period:'mid1',chapterId:'g'+grade+'-c1',
    questions:questions.map((q,i)=>({...q,id:'paper-g'+grade+'-mid1-'+(i+1),tags:['apply']}))
  });
  return [
    paper(6,'THCS Phú Diễn','https://thcs.toanmath.com/2026/11/de-giua-hoc-ki-1-toan-6-nam-2026-2027-truong-thcs-phu-dien-ha-noi.html',
      'Số tự nhiên, chia hết, ƯCLN – BCNN và hình học trực quan.',35,[
      mc('Trong số 52 708, chữ số 2 có giá trị bao nhiêu?',['20','200','2 000','20 000'],2,'Chữ số 2 ở hàng nghìn.'),
      mc('Kết quả của 18 + 3 × (11 − 7) là bao nhiêu?',['30','84','33','24'],0,'Tính trong ngoặc được 4. Nhân được 12 rồi cộng 18.'),
      mc('Số nào vừa chia hết cho 5 vừa chia hết cho 9?',['125','135','140','155'],1,'135 tận cùng bằng 5 và tổng chữ số bằng 9.'),
      mc('Số nào là số nguyên tố?',['21','39','49','43'],3,'43 không chia hết cho 2, 3, 5 hay bất cứ số nguyên tố nào không vượt quá √43.'),
      mc('Trong các số sau, số nào là bội của 14?',['18','28','44','68'],1,'28 = 14 × 2.'),
      mc('Phân tích 72 thành tích các thừa số nguyên tố.',['2³ × 3²','2² × 3³','2³ × 9²','2 × 3²'],0,'72 = 8 × 9 = 2³ × 3².'),
      mc('Một tam giác đều có chu vi 42 cm. Cạnh dài bao nhiêu?',['7 cm','12 cm','14 cm','21 cm'],2,'Ba cạnh bằng nhau nên chia chu vi cho 3.'),
      mc('Đường chéo thứ nhất của hình chữ nhật dài 15 cm. Đường chéo thứ hai dài bao nhiêu?',['7,5 cm','12 cm','15 cm','30 cm'],2,'Hai đường chéo của hình chữ nhật có cùng độ dài.'),
      ds('Một sân dài 18 m, rộng 12 m. Trường làm hai bồn hoa hình vuông cạnh 3 m nằm gọn trong sân và không chồng lên nhau.',[
        ['Diện tích sân trước khi làm bồn là 216 m².',true,'18 × 12 = 216.'],
        ['Tổng diện tích hai bồn là 12 m².',false,'Mỗi bồn rộng 3 × 3 = 9 m², hai bồn là 18 m².'],
        ['Phần sân còn lại có diện tích 198 m².',true,'216 − 18 = 198.'],
        ['Chu vi của một bồn hoa là 9 m.',false,'Chu vi là 4 × 3 = 12 m.']
      ]),
      sa('Có 48 bút chì và 36 cục tẩy. Chia đều tất cả vào số túi giống nhau lớn nhất. Có bao nhiêu túi?',12,'Số túi là ƯCLN(48, 36) = 12.'),
      sa('Một xe đến trạm sau mỗi 12 phút, xe khác sau mỗi 15 phút. Cả hai vừa cùng đến trạm. Sau ít nhất bao nhiêu phút chúng lại cùng đến?',60,'Thời gian là BCNN(12, 15) = 60 phút.'),
      sa('Mua 8 vở, giá 7 500 đồng một quyển, và 3 bút, giá 5 000 đồng một bút. Tổng số tiền là bao nhiêu nghìn đồng?',75,'8 × 7 500 + 3 × 5 000 = 75 000 đồng.')
    ]),
    paper(7,'THCS Giảng Võ','https://thcs.toanmath.com/2026/11/de-giua-hoc-ky-1-toan-7-nam-2026-2027-truong-thcs-giang-vo-ha-noi.html',
      'Số hữu tỉ, phần trăm, góc và hai đường thẳng song song.',35,[
      mc('Tính −2,4 + 0,75.',['−3,15','−1,65','1,65','−1,75'],1,'Lấy 2,4 − 0,75 = 1,65 rồi giữ dấu âm.'),
      mc('Tìm x biết x − 3/4 = −1,5.',['−9/4','3/4','−3/4','−1/4'],2,'x = −3/2 + 3/4 = −3/4.'),
      mc('Bình chứa 1 lít. Dùng 1/4 lít siro và 2/5 lít nước, bình còn trống bao nhiêu lít?',['3/20','7/20','9/20','13/20'],1,'1 − 1/4 − 2/5 = 7/20.'),
      mc('Tính (−3/4)³.',['27/64','−27/64','−9/16','−3/64'],1,'Lũy thừa bậc lẻ của cơ số âm có kết quả âm.'),
      mc('Hai góc đối đỉnh, một góc 68°. Góc còn lại bằng bao nhiêu?',['22°','68°','112°','136°'],1,'Hai góc đối đỉnh bằng nhau.'),
      mc('Một đường cắt hai đường song song tạo hai góc trong cùng phía. Một góc 57°. Góc còn lại bằng bao nhiêu?',['57°','33°','123°','147°'],2,'Hai góc trong cùng phía bù nhau.'),
      mc('Qua một điểm nằm ngoài một đường thẳng, có bao nhiêu đường thẳng song song với đường đã cho?',['0','1','2','Vô số'],1,'Theo tiên đề Euclid có đúng một đường như vậy.'),
      mc('Đường a vuông góc c. Đường b cũng vuông góc c. Biết a và b phân biệt, kết luận nào đúng?',['a ∥ b','a ⊥ b','a cắt b','a trùng b'],0,'Hai đường thẳng phân biệt cùng vuông góc với c thì song song.'),
      ds('Một cửa hàng nhập 20 hộp với giá 50 nghìn đồng mỗi hộp và bán 18 hộp với giá 65 nghìn đồng mỗi hộp.',[
        ['Tổng chi phí nhập 20 hộp là 1 000 nghìn đồng.',true,'20 × 50 = 1 000.'],
        ['Doanh thu từ 18 hộp là 1 300 nghìn đồng.',false,'18 × 65 = 1 170.'],
        ['Giá bán mỗi hộp cao hơn giá nhập 30%.',true,'(65 − 50)/50 = 0,3.'],
        ['Nếu tính cả tiền nhập hai hộp chưa bán, doanh thu đã cao hơn chi phí 100 nghìn đồng.',false,'1 170 − 1 000 = 170 nghìn đồng.']
      ]),
      sa('Tìm x biết 5/6 − x = −1/3.',7/6,'Chuyển vế được x = 5/6 + 1/3 = 7/6.','7/6'),
      sa('Món đồ có giá niêm yết 320 nghìn đồng, giảm 15%. Tính giá sau giảm theo nghìn đồng.',272,'320 × 0,85 = 272.'),
      sa('Hai góc kề bù hơn kém nhau 42°. Tính góc lớn theo độ.',111,'Tổng là 180°. Góc lớn bằng (180 + 42)/2 = 111°.'),
    ]),
    paper(8,'Marie Curie Hà Nội','https://thcs.toanmath.com/2026/10/de-giua-hoc-ky-1-toan-8-nam-2026-2027-truong-marie-curie-ha-noi.html',
      'Đa thức, hằng đẳng thức, tứ giác và diện tích thực tế.',35,[
      mc('Kết quả (12x³y²) : (3xy), khi xy khác 0, là gì?',['4x²y','4x³y','9x²y','4xy²'],0,'Chia hệ số, trừ số mũ của từng biến.'),
      mc('Sau khi thu gọn, đa thức 4x²y − 4x²y + 3xy + y có bậc bao nhiêu?',['1','2','3','4'],1,'Hai hạng tử bậc 3 triệt tiêu, còn 3xy + y.'),
      mc('Khai triển (2x − 3)(2x + 3).',['4x² + 9','2x² − 9','4x² − 6x + 9','4x² − 9'],3,'Dùng (a − b)(a + b) = a² − b².'),
      mc('Hệ số của x trong (x − 5)² là bao nhiêu?',['−10','−5','10','25'],0,'Số hạng giữa là −2 × x × 5.'),
      mc('Hình bình hành có một góc vuông là hình gì?',['Hình chữ nhật','Tam giác vuông','Chỉ có thể là hình vuông','Không suy ra được'],0,'Các góc kề bù và các góc đối bằng nhau nên cả bốn góc vuông.'),
      mc('Trung tuyến ứng với cạnh huyền dài 7 cm. Cạnh huyền dài bao nhiêu?',['3,5 cm','7 cm','14 cm','21 cm'],2,'Trong tam giác vuông, trung tuyến ứng cạnh huyền bằng nửa cạnh huyền.'),
      mc('Điều nào đúng cho mọi hình chữ nhật?',['Hai đường chéo vuông góc','Hai đường chéo bằng nhau','Bốn cạnh bằng nhau','Một đường chéo dài gấp đôi đường kia'],1,'Hai đường chéo bằng nhau và cắt nhau tại trung điểm mỗi đường.'),
      mc('Hình bình hành ABCD có AB = 11 và BC = 6. Đường phân giác góc A cắt CD tại E. Độ dài CE bằng bao nhiêu?',['5','6','11','17'],0,'Do AB ∥ CD, ∠BAE = ∠AED. Suy ra DE = AD = 6, nên CE = 11 − 6 = 5.'),
      ds('Một mảnh đất ban đầu có kích thước x + 6 và x + 2 (m), với x > 0. Sau đó chiều thứ nhất giảm 2 m, chiều kia tăng 2 m.',[
        ['Diện tích cũ bằng x² + 8x + 12.',true,'Nhân (x + 6)(x + 2).'],
        ['Sau khi đổi kích thước, mảnh đất là hình vuông.',true,'Hai cạnh cùng bằng x + 4.'],
        ['Diện tích giảm 4 m².',false,'Diện tích mới là x² + 8x + 16 nên tăng 4 m².'],
        ['Chu vi sau khi đổi lớn hơn chu vi ban đầu.',false,'Tổng hai kích thước không đổi.']
      ]),
      sa('Tìm giá trị nhỏ nhất của x² − 8x + 21 trên ℝ.',5,'Biểu thức bằng (x − 4)² + 5.'),
      sa('Tìm x biết (x + 2)² − x² = 20.',4,'Khai triển cho 4x + 4 = 20, suy ra x = 4.'),
      sa('Một hình chữ nhật có đường chéo 13 cm và chiều dài 12 cm. Tính chu vi theo cm.',34,'Pythagore cho chiều rộng √(169 − 144) = 5 cm. Chu vi bằng 2 × (12 + 5) = 34 cm.')
    ]),
    paper(9,'THCS Phước Bửu','https://thcs.toanmath.com/2026/11/de-giua-hoc-ki-1-toan-9-nam-2026-2027-truong-thcs-phuoc-buu-tp-hcm.html',
      'Hệ phương trình, phương trình quy về bậc nhất và tam giác vuông.',35,[
      mc('Phương trình nào là bậc nhất hai ẩn?',['xy = 1','x² + y = 4','2x − y = 3','x/y = 2'],2,'2x − y = 3 có dạng ax + by = c với a và b không đồng thời bằng 0.'),
      mc('Cặp nào thỏa 3x + y = 11?',['(1; 9)','(2; 5)','(3; 3)','(4; 1)'],1,'Thế x = 2, y = 5 được 6 + 5 = 11.'),
      mc('Nghiệm của hệ y = x − 1 và x + y = 7 là gì?',['(3; 4)','(4; 3)','(2; 5)','(5; 2)'],1,'Thế được 2x − 1 = 7, nên x = 4 và y = 3.'),
      mc('Hệ 2x + y = 4 và 4x + 2y = 9 có bao nhiêu nghiệm?',['Không có','Một','Hai','Vô số'],0,'Hai vế trái tỉ lệ 2 nhưng 9 khác 2 × 4.'),
      mc('Phương trình (x − 3)(2x + 4) = 0 có tập nghiệm nào?',['{3}','{−2}','{−3; 2}','{−2; 3}'],3,'Đặt từng nhân tử bằng 0.'),
      mc('Phân thức 3/(x − 5) xác định khi nào?',['x > 5','x < 5','x ≠ 5','Mọi x'],2,'Mẫu x − 5 phải khác 0.'),
      mc('Trong tam giác vuông có cạnh huyền 14 cm và một góc 30°, cạnh đối diện góc 30° dài bao nhiêu?',['7 cm','14 cm','7√2 cm','7√3 cm'],0,'Cạnh đối bằng cạnh huyền nhân sin 30°.'),
      mc('Trong tam giác ABC vuông tại A, tan B bằng tỉ số nào?',['AB/AC','AC/AB','AC/BC','BC/AB'],1,'Tan B là cạnh đối AC chia cạnh kề AB.'),
      ds('Một người đứng cách chân cột đèn 9 m theo phương ngang. Mắt cao 1,5 m, góc nâng từ mắt lên đỉnh cột bằng 45°. Cột và mặt đất vuông góc.',[
        ['Độ cao của đỉnh cột so với tầm mắt bằng 9 m.',true,'9 tan 45° = 9.'],
        ['Chiều cao cả cột là 9 m.',false,'Cộng thêm độ cao mắt 1,5 m.'],
        ['Khoảng cách từ mắt tới đỉnh cột bằng 9√2 m.',true,'Hai cạnh góc vuông của tam giác đều dài 9 m.'],
        ['Góc nâng đo giữa đường ngắm và phương thẳng đứng.',false,'Góc nâng đo từ phương ngang.']
      ]),
      sa('Hai món hàng có tổng giá 420 nghìn đồng. Giảm món thứ nhất 10%, món thứ hai 20%, tổng thanh toán 354 nghìn đồng. Tìm giá gốc món thứ nhất theo nghìn đồng.',180,'Gọi giá là x, y. Có x + y = 420 và 0,9x + 0,8y = 354. Trừ 0,8 lần phương trình đầu được 0,1x = 18.'),
      sa('Từ một điểm trên mặt đất cách chân tháp 10 m, góc nâng lên đỉnh tháp là 60°. Chiều cao có dạng k√3 m. Tìm k.',10,'Chiều cao = 10 tan 60° = 10√3.'),
      sa('Giải (x + 2)/(x − 1) = 4. Điền nghiệm.',2,'Điều kiện x ≠ 1. Nhân chéo được x + 2 = 4x − 4, suy ra x = 2.')
    ]),
    paper(10,'THPT Trần Quốc Tuấn','https://toanmath.com/2026/11/de-giua-ki-1-toan-10-nam-2026-2027-truong-thpt-tran-quoc-tuan-gia-lai.html',
      'Mệnh đề, tập hợp, bất phương trình hai ẩn và hệ thức lượng trong tam giác.',50,[
      mc('Câu nào là mệnh đề có giá trị đúng hoặc sai xác định?',['x + 2 = 7','Bạn đi đâu?','7 là số nguyên tố','Hãy tính 3²'],2,'Câu “7 là số nguyên tố” có giá trị đúng xác định.'),
      mc('Phủ định của “Mọi số nguyên đều dương” là gì?',['Mọi số nguyên đều âm','Tồn tại số nguyên không dương','Tồn tại số nguyên dương','Không có số nguyên'],1,'Phủ định của mọi là tồn tại một phản ví dụ.'),
      mc('Giao của (−2; 4] và [1; 6) là gì?',['(−2; 6)','[1; 4]','(1; 4)','[1; 6)'],1,'Khoảng chung từ 1 đến 4, cả hai đầu cùng được nhận.'),
      mc('Tập có 4 phần tử có bao nhiêu tập con thực sự?',['8','15','16','4'],1,'Có 2^4 tập con. Loại chính tập ban đầu.'),
      mc('Điểm nào thỏa x + 2y ≤ 6?',['(3; 2)','(1; 3)','(0; 4)','(2; 2)'],3,'Thay (2; 2) được 2 + 4 = 6, có dấu bằng nên được nhận.'),
      mc('Miền x ≥ 0, y ≥ 0, x + y ≤ 6 là hình gì?',['Tam giác','Hình chữ nhật','Nửa mặt phẳng','Đường thẳng'],0,'Ba đỉnh là (0; 0), (6; 0) và (0; 6).'),
      mc('Sin 150° bằng bao nhiêu?',['−1/2','1/2','√3/2','−√3/2'],1,'Sin hai góc bù bằng nhau. Sin 30° = 1/2.'),
      mc('Biết tan α = 2 và α nhọn. Biểu thức sin α/cos α bằng bao nhiêu?',['1/2','2','4','−2'],1,'Theo định nghĩa, tỉ số đó bằng tan α.'),
      mc('Nếu a = 6 cm và A = 30° trong tam giác ABC, bán kính ngoại tiếp R bằng bao nhiêu?',['3 cm','6 cm','12 cm','18 cm'],1,'2R = a/sin A = 6/(1/2) = 12 cm.'),
      mc('Tam giác có hai cạnh 6, 8 và góc xen giữa 30°. Diện tích bằng bao nhiêu?',['12','24','48','6'],0,'Diện tích là 6 × 8 × sin 30° / 2 = 12.'),
      mc('Góc A của tam giác thỏa a² = b² + c². Góc A bằng bao nhiêu?',['30°','60°','90°','120°'],2,'Định lí cosin cho cos A = 0.'),
      mc('A = {1; 2; 3}, B = {2; 5}. Hiệu B ∖ A là gì?',['{1; 3}','{2}','{1; 2; 3; 5}','{5}'],3,'Bỏ phần tử 2 khỏi B vì 2 thuộc A.'),
      ds('Một xưởng cần x giờ cắt và y giờ lắp. Hai số không âm, x + y ≤ 8 và x ≤ 5.',[
        ['Lịch (5; 3) khả thi.',true,'Tổng là 8 và x = 5, đều được phép.'],
        ['Hai đường biên x = 5 và x + y = 8 cắt nhau tại (5; 5).',false,'Thế x = 5 vào x + y = 8 được y = 3.'],
        ['Số giờ lắp có thể bằng 8.',true,'Chọn x = 0 và y = 8.'],
        ['Mọi điểm khả thi đều thỏa x + y = 8.',false,'Chẳng hạn (0; 0) cũng khả thi.']
      ]),
      ds('Hai đường đi từ A đến C và từ B đến C dài 6 km và 8 km. Góc ACB bằng 60°. Có thể xây đường đi thẳng AB.',[
        ['Đi từ A đến B qua C dài 14 km.',true,'6 + 8 = 14.'],
        ['AB² = 6² + 8².',false,'Cần trừ 2 × 6 × 8 × cos 60°.'],
        ['Đường AB dài √52 km.',true,'AB² = 36 + 64 − 48 = 52.'],
        ['Đường AB ngắn hơn lộ trình qua C đúng 6 km.',false,'Độ chênh là 14 − √52, khác 6.']
      ]),
      sa('Một tam giác có các cạnh a = 8, b = 7, c = 5. Tính cos A.',1/7,'Cos A = (49 + 25 − 64)/(2 × 7 × 5) = 10/70 = 1/7.','1/7'),
      sa('Với x, y ≥ 0 và x + y ≤ 7, giá trị lớn nhất của 2x + 3y là bao nhiêu?',21,'Xét tại ba đỉnh (0; 0), (7; 0), (0; 7), thu được 0, 14, 21.'),
      sa('Có bao nhiêu số nguyên thuộc [−4; 3] nhưng không thuộc (−2; 2]?',4,'Tập còn lại gồm −4, −3, −2 và 3.'),
      sa('Tam giác đều có cạnh 8 cm. Diện tích có dạng k√3 cm². Tìm k.',16,'S = a²√3/4 = 16√3.')
    ]),
    paper(11,'THPT Việt Đức','https://toanmath.com/2026/10/de-giua-hoc-ky-1-toan-11-nam-2026-2027-truong-thpt-viet-duc-ha-noi.html',
      'Góc và công thức lượng giác, tập xác định, đồ thị, phương trình và mô hình chuyển động tuần hoàn.',50,[
      mc('Góc −330° có cùng điểm cuối với góc nào trong [0°; 360°)?',['30°','60°','300°','330°'],0,'Cộng một vòng 360° vào −330° được 30°.'),
      mc('Với x thực, sin(π − x) − sin(−x) bằng gì?',['0','2 sin x','2 cos x','−2 sin x'],1,'Sin(π − x) = sin x và sin(−x) = −sin x.'),
      mc('Phương trình nào vô nghiệm thực?',['sin x = −1','cos x = 0','sin x = 5/4','tan x = 2'],2,'Sin chỉ nhận giá trị trong [−1; 1].'),
      mc('Cos 4x viết theo sin 2x thành gì?',['1 − 2 sin² 2x','1 + 2 sin² 2x','2 sin² 2x − 1','1 − sin² 2x'],0,'Dùng cos 2a = 1 − 2 sin² a với a = 2x.'),
      mc('Hàm nào có đồ thị qua (0; 1), qua (π/2; 0) và qua (π; −1)?',['y = sin x','y = cos x','y = tan x','y = cot x'],1,'Chỉ cos nhận ba giá trị đó lần lượt tại các mốc đã cho.'),
      mc('Hai tia có cùng điểm cuối nếu chênh số đo bao nhiêu?',['π/3','π','3π','4π'],3,'4π bằng hai vòng quay trọn vẹn.'),
      mc('Rút gọn cos 5x cos 2x − sin 5x sin 2x.',['cos 3x','cos 7x','sin 7x','sin 3x'],1,'Đây là cos(5x + 2x).'),
      mc('Biết cos α = 5/13 và α ở góc phần tư IV. Sin α bằng gì?',['12/13','−5/13','−12/13','5/13'],2,'Độ lớn 12/13, sin âm ở góc phần tư IV.'),
      mc('Hàm y = tan(2x) không xác định ở họ nào?',['x = kπ/2','x = π/4 + kπ/2','x = π/2 + kπ','x = π/8 + kπ/4'],1,'Giải 2x = π/2 + kπ.'),
      mc('Nghiệm dương nhỏ nhất của tan(3x) = 1 là gì?',['π/3','π/6','π/4','π/12'],3,'3x = π/4 + kπ, chọn k = 0.'),
      mc('Hàm số nào là hàm lẻ trên ℝ?',['cos x','sin x + 1','sin x cos x','cos² x'],2,'Tích của một hàm lẻ và một hàm chẵn là hàm lẻ.'),
      mc('Sin α và cos α cùng âm ở góc phần tư nào?',['I','II','III','IV'],2,'Ở phần tư III, cả hoành độ và tung độ đều âm.'),
      ds('Một bánh xe quan sát có tâm cao 16 m và bán kính 12 m. Góc α của ghế so với phương ngang dương cho độ cao h(α) = 16 + 12 sin α.',[
        ['Ghế ở độ cao 16 m khi α = 0.',true,'Sin 0 = 0.'],
        ['Tại α = π/6 ghế cao 28 m.',false,'h = 16 + 12 × 1/2 = 22 m.'],
        ['Độ cao thấp nhất là 4 m.',true,'Sin nhỏ nhất bằng −1.'],
        ['Từ α = 0 đến α = π/2 ghế đi xuống.',false,'Sin tăng từ 0 đến 1 trên khoảng này.']
      ]),
      ds('Xét phương trình 3 cos x − 1 = m trên [0; 2π).',[
        ['Phương trình có nghiệm khi −4 ≤ m ≤ 2.',true,'Vế trái nhận các giá trị từ −4 đến 2.'],
        ['Với m = 2, có hai nghiệm phân biệt.',false,'Khi cos x = 1 chỉ có x = 0 trong khoảng nửa kín.'],
        ['Với m = −1, có hai nghiệm.',true,'Cos x = 0 tại π/2 và 3π/2.'],
        ['Với m = 4, vẫn có một nghiệm.',false,'m = 4 lớn hơn giá trị lớn nhất 2.']
      ]),
      sa('Camera quay quanh tâm bán kính 9 m qua một cung 80°. Độ dài cung có dạng kπ m. Tìm k.',4,'80° = 4π/9. Nhân bán kính 9 m được 4π m.'),
      sa('Tính tan 2a, biết tan a = 1/2.',4/3,'Công thức cho 1/(1 − 1/4) = 4/3.','4/3'),
      sa('Một phao có độ cao h(t) = 5 + 0,6 cos(πt/5), t tính bằng giây. Chu kì tính bằng giây là bao nhiêu?',10,'T = 2π/(π/5) = 10 giây.'),
      sa('Phương trình sin(3x) = 1/2 có bao nhiêu nghiệm trên [0; 2π)?',6,'Đối số 3x chạy qua ba chu kì nửa kín. Mỗi chu kì có hai nghiệm.')
    ]),
    paper(12,'THPT chuyên Quốc học – Huế','https://toanmath.com/2026/11/de-giua-ky-1-toan-12-nam-2026-2027-truong-thpt-chuyen-quoc-hoc-hue.html',
      'Đơn điệu, cực trị, tiệm cận, đọc đồ thị và tối ưu hóa thực tế.',50,[
      mc('Đồ thị y = (3x − 1)/(2x + 5) có tiệm cận ngang nào?',['y = 3/2','x = 3/2','y = −1/5','x = −5/2'],0,'Lấy tỉ số hệ số bậc cao nhất của tử và mẫu.'),
      mc('Trên [0; 2], hiệu giá trị lớn nhất và nhỏ nhất của f(x) = (x + 3)/(x + 1) là bao nhiêu?',['2/3','4/3','2','8/3'],1,'f giảm trên đoạn, f(0)=3 và f(2)=5/3. Hiệu là 4/3.'),
      mc('Hàm f(x) = x³ − 12x nghịch biến trên khoảng nào?',['(−∞; −2)','(−2; 2)','(2; +∞)','(0; +∞)'],1,'f′=3(x² − 4) âm khi −2 < x < 2.'),
      mc('Biết f giảm từ f(−1) = 4 đến f(1) = −2, sau đó tăng đến f(3) = 5. Giá trị nhỏ nhất trên [−1; 3] bằng bao nhiêu?',['1','−2','4','5'],1,'Giá trị nhỏ nhất đạt ở điểm đổi từ giảm sang tăng.'),
      mc('Một đồ thị bậc ba có nhánh trái hướng xuống, nhánh phải hướng lên và đi qua (0; 2). Hàm nào có thể phù hợp?',['−x³ + 2','x³ + 2','x³ − 2','−x³ − 2'],1,'Hệ số bậc ba phải dương và hệ số tự do bằng 2.'),
      mc('Biết f′ đổi dấu từ dương sang âm qua x = 1. Điều nào đúng nếu f liên tục tại 1?',['f đạt cực đại tại 1','f đạt cực tiểu tại 1','f tăng qua 1','f(1)=0'],0,'Dấu đạo hàm chuyển từ + sang − là dấu hiệu cực đại.'),
      mc('Giá trị cực tiểu của f(x) = x^4 − 8x² + 3 là bao nhiêu?',['3','−13','−5','±2'],1,'Viết f(x) = (x² − 4)² − 13. Tại x = ±2 giá trị bằng −13.'),
      mc('Đồ thị bậc ba có cực đại bằng 4 và cực tiểu bằng −2. Đường y = 0 cắt đồ thị tại bao nhiêu điểm phân biệt?',['0','1','2','3'],3,'0 nằm giữa hai giá trị cực trị, đường ngang cắt ba nhánh đơn điệu.'),
      mc('Chuyển động có s(t) = 2t³ − 5t² + 4t. Vận tốc v(t) là gì?',['6t² − 10t + 4','2t² − 5t + 4','6t² − 5t + 4','6t² − 10t'],0,'Vận tốc là đạo hàm của tọa độ theo thời gian.'),
      mc('Đồ thị có giới hạn bằng 2 khi x tiến tới +∞ và −∞. Khi x tiến tới 1 từ hai phía, giá trị hàm tiến ra vô cực; ngoài x = 1 hàm liên tục trên ℝ. Tổng số tiệm cận ngang và đứng là bao nhiêu?',['0','1','2','3'],2,'Có một đường ngang y = 2 và một đường đứng x = 1.'),
      mc('Hàm nào có đúng hai tiệm cận x = 2 và y = 3?',['3 + 1/(x − 2)','2 + 1/(x − 3)','3 + 1/(x + 2)','1/(x − 2)'],0,'Mẫu bằng 0 tại x = 2. Khi |x| lớn, phân thức tiến về 0 và giá trị hàm tiến về 3.'),
      mc('Cho f′(x) = (x + 2)²(x − 1)(x − 4) trên ℝ. Số điểm cực trị của f là bao nhiêu?',['0','1','2','3'],2,'Đạo hàm chỉ đổi dấu ở hai nghiệm đơn 1 và 4.'),
      ds('Xét y = (x² + 1)/x.',[
        ['Tập xác định loại x = 0.',true,'Mẫu phải khác 0.'],
        ['Đồ thị có tiệm cận xiên y = x.',true,'Chia được y = x + 1/x, hiệu tiến về 0.'],
        ['Đạo hàm bằng 1 + 1/x².',false,'Đạo hàm của 1/x bằng −1/x².'],
        ['Hai điểm cực trị có cùng tung độ.',false,'Tại x = ±1, tung độ là ±2.']
      ]),
      ds('Một nhóm đặt xe tham quan. Nếu có n khách, mỗi khách trả 120 − 2n nghìn đồng. Số khách nguyên dương, tối đa 40.',[
        ['Với 20 khách, mỗi khách trả 80 nghìn đồng.',true,'120 − 2 × 20 = 80.'],
        ['Doanh thu được tính bằng 120 − 2n.',false,'Phải nhân giá vé với n.'],
        ['Doanh thu cao nhất khi có 30 khách.',true,'Hàm 120n − 2n² đạt đỉnh tại n = 30.'],
        ['Doanh thu cao nhất là 2 000 nghìn đồng.',false,'Tại n = 30, doanh thu là 30 × 60 = 1 800 nghìn đồng.']
      ]),
      sa('Tìm khoảng cách từ tâm đối xứng của đồ thị y = (x − 2)³ + 5 đến trục hoành.',5,'Tâm đối xứng là (2; 5), khoảng cách đến Ox bằng |5|.'),
      sa('Tiệm cận xiên của y = (2x² + 5x + 1)/(x + 1) là y = ax + b. Tìm a + b.',5,'Chia đa thức được 2x + 3 − 2/(x + 1). Tiệm cận là y = 2x + 3.'),
      sa('Dùng 40 m rào làm ba cạnh của khu vườn chữ nhật, cạnh còn lại áp tường. Diện tích lớn nhất theo m² là bao nhiêu?',200,'Gọi x là cạnh vuông góc tường. Diện tích x(40 − 2x) đạt lớn nhất tại x = 10, bằng 200.'),
      sa('Bể chữ nhật có diện tích 144 m². Làm lối đi rộng 1 m xung quanh, viền ngoài vẫn là hình chữ nhật. Tính diện tích lối đi nhỏ nhất theo m².',52,'Với kích thước a,b, diện tích lối đi là 2(a+b)+4. Do ab = 144 nên a+b ≥ 24. Dấu bằng khi a=b=12.')
    ])
  ];
})();
