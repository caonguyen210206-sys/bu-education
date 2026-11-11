'use strict';

const buExamPapers = (() => {
  const mc=(prompt,options,answer,explanation)=>({type:'mcq',prompt,options,answer,explanation});
  const sa=(prompt,answer,explanation,answerText)=>({type:'short',prompt,answer,answerText,explanation});
  const ds=(prompt,rows)=>({type:'tf',prompt,statements:rows.map(([text,answer,explanation])=>({text,answer,explanation}))});
  const additions={
    6:[
      mc('Đẳng thức nào đúng?',['2³ + 2² = 2⁵','2³ × 2² = 2⁶','2⁵ : 2² = 2³','(2²)³ = 2⁵'],2,'Khi chia hai lũy thừa cùng cơ số khác 0, lấy số mũ của số bị chia trừ số mũ của số chia.'),
      mc('Cần thêm ít nhất bao nhiêu vào 47 để được một số chia hết cho 6?',['1','2','5','6'],0,'Bội của 6 nhỏ nhất và lớn hơn 47 là 48.'),
      mc('Nếu hình vuông có cạnh gấp đôi thì diện tích thay đổi thế nào?',['Tăng gấp đôi','Tăng gấp ba','Tăng gấp bốn','Không đổi'],2,'Cả chiều dài và chiều rộng đều tăng gấp đôi. Diện tích tăng 2 × 2 = 4 lần.'),
      mc('Hai số tự nhiên nào nguyên tố cùng nhau?',['9 và 21','12 và 18','15 và 28','16 và 24'],2,'Các thừa số nguyên tố của 15 là 3, 5. Của 28 là 2, 7. Vì vậy ƯCLN bằng 1.'),
      ds('Một lớp có 24 học sinh nữ và 18 học sinh nam. Cô chia tất cả thành các nhóm có số nữ bằng nhau và số nam bằng nhau.',[
        ['Có thể chia thành 3 nhóm.',true,'Cả 24 và 18 đều chia hết cho 3.'],
        ['Phương án chia lớp thành 4 nhóm thỏa yêu cầu.',false,'18 học sinh nam không chia đều được vào 4 nhóm.'],
        ['Số nhóm nhiều nhất là 6.',true,'ƯCLN(24, 18) = 6.'],
        ['Khi chia thành nhiều nhóm nhất, mỗi nhóm có 6 học sinh.',false,'Mỗi nhóm có 24 : 6 + 18 : 6 = 7 học sinh.']
      ]),
      ds('Xét số tự nhiên N có ba chữ số 4, x, 5 theo thứ tự từ trái sang phải, với x là một chữ số.',[
        ['N luôn chia hết cho 5.',true,'Chữ số hàng đơn vị là 5.'],
        ['Không có cách chọn x để N chia hết cho 9.',false,'Tổng chữ số là 9 + x nên x = 0 hoặc x = 9 đều được.'],
        ['Có 4 cách chọn x để N chia hết cho 3.',true,'Có thể chọn x trong tập {0; 3; 6; 9}.'],
        ['Có cách chọn x để N chia hết cho 2.',false,'Chữ số hàng đơn vị luôn là số lẻ.']
      ]),
      ds('Một hình vuông và một hình chữ nhật có cùng chu vi 32 cm. Hình chữ nhật dài 10 cm.',[
        ['Cạnh hình vuông dài 8 cm.',true,'32 : 4 = 8 cm.'],
        ['Chiều rộng hình chữ nhật dài 12 cm.',false,'Nửa chu vi là 16 cm nên chiều rộng là 6 cm.'],
        ['Hình vuông có diện tích lớn hơn hình chữ nhật.',true,'Hai diện tích lần lượt là 64 cm² và 60 cm².'],
        ['Có thể xếp kín hình chữ nhật bằng 15 hình vuông cạnh 2 cm.',true,'Xếp 10 : 2 = 5 hình theo chiều dài và 6 : 2 = 3 hình theo chiều rộng.']
      ]),
      sa('Tìm số tự nhiên có ba chữ số nhỏ nhất chia hết cho cả 18 và 24.',144,'BCNN(18, 24) = 72. Hai bội dương đầu tiên là 72 và 144, nên chọn 144.'),
      sa('Một tấm bìa hình chữ nhật dài 30 cm, rộng 18 cm. Cắt kín tấm bìa thành các hình vuông bằng nhau có cạnh dài nhất có thể. Cắt được bao nhiêu hình?',15,'Cạnh mỗi hình vuông dài ƯCLN(30, 18) = 6 cm. Có 5 × 3 = 15 hình.'),
      sa('Tính giá trị 5² − 2 × (12 − 3²).',19,'Tính lũy thừa trước. Trong ngoặc còn 12 − 9 = 3, nên kết quả là 25 − 6 = 19.')
    ],
    7:[
      mc('Trong các số sau, số nào lớn nhất?',['−0,51','−1/2','−0,49','−3/5'],2,'Viết các số dưới dạng thập phân rồi so sánh. Số âm gần 0 nhất là −0,49.'),
      mc('Tích của ba thừa số âm và hai thừa số dương có dấu gì?',['Dương','Âm','Bằng 0','Tùy độ lớn các thừa số'],1,'Có số lẻ thừa số âm nên tích âm.'),
      mc('Mỗi góc do hai đường thẳng cắt nhau tạo thành đều bằng góc kề với nó. Số đo mỗi góc là bao nhiêu?',['45°','60°','90°','180°'],2,'Hai góc kề trong hình này bù nhau. Vì chúng bằng nhau nên mỗi góc bằng 90°.'),
      mc('Đường thẳng c cắt hai đường thẳng a, b phân biệt. Điều kiện nào đủ để kết luận a ∥ b?',['Hai góc trong cùng phía bằng nhau','Một cặp góc đồng vị bù nhau','Một cặp góc so le trong bằng nhau','Hai góc đối đỉnh bằng nhau'],2,'Hai góc so le trong bằng nhau là dấu hiệu nhận biết hai đường thẳng song song.'),
      ds('Một bể đang chứa 3/5 dung tích. Người ta lấy ra 1/4 lượng nước đang có. Xét bể có dung tích 80 lít.',[
        ['Ban đầu trong bể có 48 lít nước.',true,'80 × 3/5 = 48.'],
        ['Lượng nước lấy ra bằng 1/4 dung tích bể.',false,'Phân số 1/4 tính trên lượng nước đang có, chỉ bằng 3/20 dung tích bể.'],
        ['Sau khi lấy ra, nước chiếm 9/20 dung tích bể.',true,'Phần còn lại bằng 3/4 của 3/5, tức 9/20.'],
        ['Cần thêm 32 lít nữa để đầy bể.',false,'Còn 36 lít nước, nên cần thêm 44 lít.']
      ]),
      ds('Hai đường thẳng a và b cắt đường thẳng c. Một góc trong tại giao điểm với a bằng 65°, góc trong cùng phía với nó tại giao điểm với b bằng 115°.',[
        ['a và b song song.',true,'Hai góc trong cùng phía có tổng 180°.'],
        ['Góc đồng vị với góc 65° cũng có số đo 65°.',true,'Hai đường thẳng song song tạo các cặp góc đồng vị bằng nhau.'],
        ['Góc đối đỉnh với góc 115° có số đo 65°.',false,'Góc đối đỉnh với góc 115° cũng bằng 115°.'],
        ['c vuông góc với a.',false,'Góc đã cho tại giao điểm là 65°, khác 90°.']
      ]),
      ds('Vào buổi sáng nhiệt độ là −3,5 °C. Đến trưa nhiệt độ tăng thêm 6,25 °C. Từ trưa đến tối nhiệt độ giảm 4 °C.',[
        ['Buổi sáng nhiệt độ dưới 0 °C.',true,'−3,5 là số âm.'],
        ['Buổi trưa nhiệt độ là 2,75 °C.',true,'−3,5 + 6,25 = 2,75.'],
        ['Buổi tối nhiệt độ là 1,25 °C.',false,'2,75 − 4 = −1,25.'],
        ['Từ sáng đến tối nhiệt độ tăng 2,25 °C.',true,'Độ thay đổi là 6,25 − 4 = 2,25 °C.']
      ]),
      sa('Một món hàng giá 250 nghìn đồng. Tăng giá 20%, rồi giảm 20% trên giá mới. Giá cuối cùng là bao nhiêu nghìn đồng?',240,'Giá cuối bằng 250 × 1,2 × 0,8 = 240 nghìn đồng.'),
      sa('Hai góc kề bù. Góc thứ nhất bằng 2/3 góc thứ hai. Tính số đo góc thứ nhất theo độ.',72,'Tổng 180° gồm 2 + 3 = 5 phần. Góc thứ nhất có 2 phần, bằng 72°.'),
      sa('Tính (−2/3)³ : (−4/9).',2/3,'Lũy thừa bằng −8/27. Nhân với nghịch đảo −9/4 được 2/3.','2/3')
    ],
    8:[
      mc('Hạng tử nào đồng dạng với −3x²y?',['3xy²','−3x²','5x²y','x²y²'],2,'Phần biến phải giống nhau cả về biến và số mũ.'),
      mc('Tích (x − 1)(x² + x + 1) bằng biểu thức nào?',['x³ + 1','x³ − 1','x³ − x² + 1','x³ − x'],1,'Dùng hằng đẳng thức hiệu hai lập phương.'),
      mc('Một hình bình hành có hai đường chéo vuông góc. Kết luận nào luôn đúng?',['Đó là hình thoi','Đó là hình chữ nhật','Đó là hình vuông','Hai đường chéo bằng nhau'],0,'Hình bình hành có hai đường chéo vuông góc là hình thoi.'),
      mc('Tính nhanh 103 × 97.',['9 009','9 909','9 991','10 009'],2,'Hai thừa số là 100 + 3 và 100 − 3, tích bằng 100² − 3² = 9 991.'),
      ds('Cho P = (x + 3)² − (x − 3)².',[
        ['Hai hạng tử chứa x² triệt tiêu khi khai triển.',true,'Cả hai bình phương đều có hệ số của x² bằng 1.'],
        ['P = 6x.',false,'Hiệu hai bình phương bằng 6 × 2x = 12x.'],
        ['P đổi dấu khi thay x bằng −x.',true,'P(−x) = −12x = −P(x).'],
        ['Với x = 1, giá trị P là 16.',false,'P(1) = 12.']
      ]),
      ds('Cho hình thoi ABCD có hai đường chéo AC = 16 cm, BD = 12 cm cắt nhau tại O.',[
        ['O là trung điểm của AC và BD.',true,'Hình thoi là hình bình hành.'],
        ['Tam giác AOB vuông tại O.',true,'Hai đường chéo của hình thoi vuông góc.'],
        ['Cạnh AB dài 14 cm.',false,'Pythagore cho AB = √(8² + 6²) = 10 cm.'],
        ['Diện tích hình thoi bằng 96 cm².',true,'Diện tích bằng 16 × 12 : 2 = 96 cm².']
      ]),
      ds('Hai hình vuông có độ dài cạnh a và b với a > b > 0. Biết a + b = 14 cm và a − b = 4 cm.',[
        ['Hình vuông lớn có cạnh 9 cm.',true,'Cộng hai đẳng thức được 2a = 18.'],
        ['Hiệu diện tích bằng 16 cm².',false,'Hiệu bằng (a + b)(a − b) = 56 cm².'],
        ['Tổng chu vi của hai hình là 56 cm.',true,'Tổng chu vi bằng 4(a + b).'],
        ['Tổng diện tích của hai hình bằng 196 cm².',false,'a² + b² = 9² + 5² = 106 cm².']
      ]),
      sa('Cho x + y = 7 và xy = 10. Tính x² + y².',29,'Từ (x + y)² = x² + 2xy + y², suy ra 49 − 20 = 29.'),
      sa('Một hình thoi có chu vi 52 cm và một đường chéo dài 10 cm. Tính độ dài đường chéo còn lại theo cm.',24,'Cạnh hình thoi bằng 13 cm. Hai nửa đường chéo là cạnh góc vuông của tam giác có cạnh huyền 13 cm. Nửa còn lại dài √(169 − 25) = 12 cm.'),
      sa('Phân tích 2x² − 8x thành nhân tử rồi tìm tổng các nghiệm của 2x² − 8x = 0.',4,'Ta có 2x(x − 4) = 0, nên hai nghiệm là 0 và 4.')
    ],
    9:[
      mc('Hệ x + 2y = 3 và 2x + 4y = 6 có bao nhiêu nghiệm?',['0','1','2','Vô số'],3,'Phương trình thứ hai thu được bằng cách nhân phương trình đầu với 2.'),
      mc('Tập nghiệm của phương trình (x − 2)/(x − 2) = 1 là gì?',['ℝ','ℝ ∖ {2}','{2}','∅'],1,'Đẳng thức đúng với mọi x thỏa điều kiện mẫu khác 0, tức x ≠ 2.'),
      mc('Tam giác ABC vuông tại A. Đẳng thức nào đúng?',['sin B = sin C','sin B = cos C','tan B = tan C','cos B = 1 − cos C'],1,'B và C phụ nhau, nên sin B = cos C.'),
      mc('Cộng hai phương trình 2x + 3y = 7 và x − 3y = 2, ta nhận được gì?',['x = 3','x = 5','y = 3','3x + 6y = 9'],0,'Hai hạng tử chứa y triệt tiêu. Còn 3x = 9.'),
      ds('Một rạp bán 30 vé gồm vé người lớn 60 nghìn đồng và vé trẻ em 40 nghìn đồng, thu tổng cộng 1 440 nghìn đồng. Gọi x, y lần lượt là số vé người lớn và số vé trẻ em.',[
        ['Tổng số vé được biểu diễn bằng x + y = 30.',true,'Hai loại vé được tính vào cùng tổng.'],
        ['Phương trình doanh thu là 40x + 60y = 1 440.',false,'Hệ số của x phải là 60, của y là 40.'],
        ['Rạp bán 12 vé người lớn.',true,'Lấy 60x + 40y = 1 440 trừ 40(x + y) = 1 200, được 20x = 240.'],
        ['Doanh thu từ hai loại vé bằng nhau.',true,'Hai khoản thu là 12 × 60 và 18 × 40, cùng bằng 720 nghìn đồng.']
      ]),
      ds('Xét phương trình (x² − 9)/(x − 3) = 6.',[
        ['Điều kiện xác định là x ≠ 3.',true,'Mẫu bằng 0 tại x = 3.'],
        ['Vế trái bằng x + 3 tại mọi giá trị thỏa điều kiện xác định.',true,'Phân tích tử thành (x − 3)(x + 3) rồi rút gọn.'],
        ['Phương trình có nghiệm x = 3.',false,'Ứng viên x = 3 bị loại vì mẫu bằng 0.'],
        ['Nếu thay vế phải bằng 4 thì nghiệm là x = 1.',true,'Giải x + 3 = 4 được x = 1, thỏa điều kiện.']
      ]),
      ds('Một chiếc thang dài 5 m tựa vào bức tường thẳng đứng. Chân thang cách chân tường 3 m. Mặt đất nằm ngang và thang hợp với mặt đất góc α.',[
        ['Đầu thang cao 4 m so với mặt đất.',true,'Dùng định lí Pythagore: √(25 − 9) = 4.'],
        ['Cos α = 4/5.',false,'Cạnh kề là 3 m nên cos α = 3/5.'],
        ['Tan α lớn hơn 1.',true,'Cạnh đối dài 4 m và cạnh kề dài 3 m.'],
        ['Góc α nhỏ hơn 45°.',false,'Vì cạnh đối dài hơn cạnh kề, góc α lớn hơn 45°.']
      ]),
      sa('Tìm m để hệ mx + y = 4 và 2x − y = 2 có nghiệm với x = 2.',1,'Phương trình hai cho y = 2. Thay vào phương trình đầu được 2m + 2 = 4.'),
      sa('Một dốc thẳng đi lên 1,2 m trên đoạn nằm ngang dài 9 m. Đi thêm 6 m theo phương ngang trên cùng độ dốc thì độ cao tăng thêm bao nhiêu mét?',0.8,'Hai đoạn có cùng góc dốc. Độ cao tăng thêm bằng 6 × 1,2/9 = 0,8 m.'),
      sa('Tìm tổng các nghiệm của (3x − 1)(x + 2) = 0.',-5/3,'Các nghiệm lần lượt là 1/3 và −2. Tổng bằng −5/3.','−5/3')
    ],
    10:[
      ds('Một nhóm gồm 30 học sinh. Có 19 bạn chọn bóng đá, 14 bạn chọn cầu lông và 7 bạn chọn cả hai.',[
        ['Có 12 bạn chỉ chọn bóng đá.',true,'19 − 7 = 12.'],
        ['Có 33 bạn chọn ít nhất một môn.',false,'Cần trừ 7 bạn được đếm hai lần. Kết quả là 26.'],
        ['Có 4 bạn không chọn môn nào.',true,'30 − 26 = 4.'],
        ['Số bạn chỉ chọn đúng một môn là 19.',true,'Có 12 bạn chỉ chọn bóng đá và 7 bạn chỉ chọn cầu lông.']
      ]),
      ds('Trong tam giác ABC, cho AB = AC = 10 cm và ∠BAC = 120°. Gọi H là trung điểm BC.',[
        ['Góc ABC bằng 60°.',false,'Hai góc đáy bằng nhau và có tổng 60°, nên mỗi góc bằng 30°.'],
        ['AH vuông góc với BC.',true,'Trung tuyến ứng với đáy tam giác cân đồng thời là đường cao.'],
        ['BC dài 10√3 cm.',true,'BC² = 100 + 100 − 200 cos 120° = 300.'],
        ['Diện tích tam giác bằng 50√3 cm².',false,'Diện tích bằng 10 × 10 × sin 120° : 2 = 25√3 cm².']
      ]),
      sa('Tập A có 6 phần tử, trong đó có hai phần tử phân biệt a và b. Có bao nhiêu tập con của A chứa a nhưng không chứa b?',16,'a bắt buộc có, b bắt buộc vắng mặt. Mỗi phần tử trong bốn phần tử còn lại có hai lựa chọn, cho 2⁴ = 16 tập.'),
      sa('Điểm (x; y) thuộc miền x ≥ 0, y ≥ 0, 2x + y ≤ 8 và x + 2y ≤ 8. Tìm giá trị lớn nhất của x + y.',16/3,'Cộng hai bất phương trình được 3(x + y) ≤ 16. Dấu bằng đạt khi x = y = 8/3.','16/3')
    ],
    11:[
      ds('Xét hàm số y = sin(x + π/3) − sin(x − π/3).',[
        ['Hàm số xác định trên ℝ.',true,'Cả hai biểu thức sin đều xác định với mọi x thực.'],
        ['Biểu thức thu gọn bằng √3 cos x.',true,'Dùng hiệu hai sin để được 2 cos x sin(π/3).'],
        ['Hàm số là hàm lẻ.',false,'Sau khi rút gọn thu được một bội khác 0 của hàm cos, là hàm chẵn.'],
        ['Trên [0; π], hàm số đạt giá trị nhỏ nhất tại x = π.',true,'Cos x giảm từ 1 đến −1 trên đoạn này.']
      ]),
      ds('Xét phương trình 3 sin x + 4 cos x = c. Đặt góc φ sao cho cos φ = 3/5, sin φ = 4/5.',[
        ['Vế trái có thể viết thành 5 sin(x + φ).',true,'Khai triển công thức cộng rồi nhân 5.'],
        ['Phương trình có nghiệm thực với c = −6.',false,'Vế trái chỉ nhận giá trị từ −5 đến 5.'],
        ['Với c = 5, phương trình có đúng một nghiệm trên [0; 2π).',true,'Mỗi chu kì, sin nhận giá trị 1 đúng một lần.'],
        ['Với c = 0, hai nghiệm liên tiếp chênh nhau 2π.',false,'Sin bằng 0 tại các bội của π, nên khoảng cách là π.']
      ]),
      sa('Có bao nhiêu giá trị nguyên của m để phương trình 5 sin x − 12 cos x = m có nghiệm thực?',27,'Biên độ là √(5² + 12²) = 13. Vì vậy m có thể là mọi số nguyên từ −13 đến 13, gồm 27 giá trị.'),
      sa('Phương trình cos² x = sin² x có bao nhiêu nghiệm trên đoạn [0; 3π]?',6,'Phương trình tương đương cos 2x = 0, tức x = π/4 + kπ/2. Chọn k từ 0 đến 5.')
    ],
    12:[
      ds('Một vật chuyển động theo trục thẳng. Tọa độ ở thời điểm t thuộc [0; 5] là s(t) = t³ − 6t² + 9t, tính bằng mét.',[
        ['Vận tốc tại t = 0 bằng 9 m/s.',true,'s′(0) = 9.'],
        ['Vật chuyển động theo chiều âm trong khoảng (1; 3).',true,'Vận tốc 3(t − 1)(t − 3) âm trên khoảng đó.'],
        ['Vật chỉ đổi chiều một lần.',false,'Vận tốc đổi dấu ở cả t = 1 và t = 3.'],
        ['Từ t = 0 đến t = 3, quãng đường bằng 0.',false,'Vật đi từ tọa độ 0 đến 4 rồi trở lại 0, nên quãng đường là 8 m.']
      ]),
      ds('Cho f(x) = (x² − 4)/(x − 2). Xét đồ thị trên tập xác định của f.',[
        ['Tập xác định là ℝ ∖ {2}.',true,'Mẫu bằng 0 tại x = 2.'],
        ['x = 2 là tiệm cận đứng.',false,'Hàm bằng x + 2 khi x ≠ 2, nên giới hạn tại 2 bằng 4.'],
        ['Đồ thị không chứa điểm (2; 4).',true,'Hoành độ 2 không thuộc tập xác định.'],
        ['Hàm số nghịch biến trên (2; +∞).',false,'Trên khoảng đó f(x) = x + 2, có hệ số góc 1 nên đồng biến.']
      ]),
      sa('Cho f′(x) = (x + 3)(x − 2)²(x − 5) trên ℝ. Tổng hoành độ các điểm cực trị của f bằng bao nhiêu?',2,'Đạo hàm chỉ đổi dấu ở hai nghiệm đơn −3 và 5. Tổng bằng 2.'),
      sa('Một xưởng có chi phí sản xuất x sản phẩm là C(x) = x² + 144, với x nguyên dương. Tại sản lượng nào chi phí trung bình mỗi sản phẩm nhỏ nhất?',12,'Chi phí trung bình là x + 144/x = 24 + (x − 12)²/x. Giá trị nhỏ nhất đạt tại x = 12.')
    ]
  };
  const paper=(grade,school,source,scope,minutes,questions)=>{
    const bank=[
      ...questions.map((q,i)=>({...q,id:'paper-g'+grade+'-mid1-'+(i+1)})),
      ...additions[grade].map((q,i)=>({...q,id:'paper-g'+grade+'-mid1-extra-'+(i+1)}))
    ];
    return {id:'mid1-school-g'+grade,grade,title:'Giữa kỳ I · Theo đề '+school,source,scope,minutes,period:'mid1',chapterId:'g'+grade+'-c1',
      questions:buExamFormat.flatMap(({type})=>bank.filter(q=>q.type===type).map(q=>({...q,tags:[type==='mcq'?'recognize':'apply']})))};
  };
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
