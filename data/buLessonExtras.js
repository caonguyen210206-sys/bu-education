const buLessonExtras = {
 "g6-b3": {
  "title": "So sánh hai số tự nhiên",
  "facts": [
   "Trên tia số, số ở bên trái nhỏ hơn số ở bên phải.",
   "Với cách viết thập phân, số có nhiều chữ số hơn thì lớn hơn. Nếu bằng số chữ số, so từ trái sang phải đến chữ số đầu tiên khác nhau.",
   "Hai số tự nhiên liên tiếp chênh nhau 1. Số 0 có số liền sau nhưng không có số liền trước trong ℕ."
  ],
  "formula": "Nếu a < b và b < c thì a < c.",
  "method": {
   "title": "Xếp số tự nhiên theo thứ tự",
   "steps": [
    "Đếm số chữ số của từng số.",
    "Với các số cùng số chữ số, so theo hàng lớn nhất đang khác nhau.",
    "Viết thứ tự và kiểm tra bằng vị trí trên tia số."
   ],
   "worked": [
    [
     "Xếp số tự nhiên theo thứ tự",
     "Xếp 9 980, 10 010, 9 908 và 9 989 theo thứ tự tăng dần.",
     [
      "10 010 có năm chữ số nên lớn nhất.",
      "Ba số bốn chữ số cùng bắt đầu bằng 99. Ở hàng chục, 0 < 8. Hai số có 8 chục được phân biệt bằng hàng đơn vị 0 < 9."
     ],
     "9 908 < 9 980 < 9 989 < 10 010.",
     "Chữ số 9 ở hàng nghìn không làm số bốn chữ số lớn hơn số có năm chữ số."
    ]
   ]
  }
 },
 "g6-b5": {
  "title": "Phép chia có dư và quan hệ với phép nhân",
  "facts": [
   "Tích của a và b có thể đổi thứ tự hai thừa số. Phép chia cho một số khác 0 không có tính giao hoán.",
   "Trong phép chia có dư, số dư nhỏ hơn số chia. Số dư bằng 0 thì phép chia là phép chia hết."
  ],
  "formula": "a = bq + r với b > 0 và 0 ≤ r < b.",
  "method": {
   "title": "Tính số nhóm và số dư",
   "steps": [
    "Nhận ra số bị chia là tổng số vật, số chia là số vật trong một nhóm.",
    "Tìm bội lớn nhất của số chia không vượt quá tổng.",
    "Trừ để tìm số dư, rồi trả lời theo việc đề có cần chứa cả phần dư hay không."
   ],
   "worked": [
    [
     "Tính số nhóm và số dư",
     "Có 157 cuốn sách. Mỗi hộp đựng tối đa 12 cuốn. Cần ít nhất bao nhiêu hộp để đựng hết?",
     [
      "12 × 13 = 156 và 12 × 14 = 168. Phép chia có thương 13, dư 1.",
      "Mười ba hộp chứa được 156 cuốn. Cuốn còn lại cần thêm một hộp."
     ],
     "14 hộp.",
     "Thương 13 là số hộp đầy. Đề hỏi số hộp cần dùng."
    ]
   ]
  }
 },
 "g6-b7": {
  "title": "Thứ tự thực hiện phép tính",
  "facts": [
   "Tính bên trong ngoặc trước, từ ngoặc trong cùng ra ngoài.",
   "Khi không có ngoặc, tính lũy thừa trước, rồi nhân và chia, sau cùng là cộng và trừ.",
   "Các phép cùng mức ưu tiên được tính từ trái sang phải."
  ],
  "formula": "a − b + c = (a − b) + c.",
  "method": {
   "title": "Tính biểu thức nhiều phép toán",
   "steps": [
    "Đánh dấu các cụm phải tính trước.",
    "Viết từng dòng chỉ thay những cụm đã tính.",
    "Kiểm tra phép chia và phép trừ có cùng mức ưu tiên với phép toán liền sau không."
   ],
   "worked": [
    [
     "Tính biểu thức nhiều phép toán",
     "Tính 72 : 8 × 3 − (2³ + 4).",
     [
      "Trong ngoặc được 8 + 4 = 12.",
      "Ở bên ngoài, tính 72 : 8 = 9 trước rồi nhân 3 được 27.",
      "Lấy 27 − 12."
     ],
     "15.",
     "Không tự ghép 8 × 3 làm số chia khi đề không đặt ngoặc."
    ]
   ]
  }
 },
 "g6-b9": {
  "title": "Dấu hiệu chia hết cho 2, 3, 5 và 9",
  "facts": [
   "Số chia hết cho 2 nếu chữ số hàng đơn vị chẵn. Chia hết cho 5 nếu chữ số đó là 0 hoặc 5.",
   "Số chia hết cho 3 hoặc 9 khi tổng các chữ số chia hết cho 3 hoặc 9 tương ứng.",
   "Khi cần thỏa nhiều dấu hiệu, phải kiểm tra đồng thời từng điều kiện."
  ],
  "formula": "Nếu a chia hết cho 9 thì a chia hết cho 3.",
  "method": {
   "title": "Tìm chữ số chưa biết",
   "steps": [
    "Dùng điều kiện hàng đơn vị để thu hẹp khả năng.",
    "Tính tổng chữ số có chứa chữ số chưa biết.",
    "Liệt kê giá trị thỏa và thay lại vào số đã cho."
   ],
   "worked": [
    [
     "Tìm chữ số chưa biết",
     "Thay □ trong 52□5 để số đó chia hết cho 9 và 5.",
     [
      "Chữ số tận cùng là 5 nên chia hết cho 5.",
      "Tổng chữ số là 12 + □. Trong khoảng từ 12 đến 21, bội của 9 duy nhất là 18.",
      "Vậy □ = 6, số nhận được là 5265."
     ],
     "6.",
     "Kiểm tra tổng chữ số cho chia hết cho 9. Hàng đơn vị không đủ để kết luận."
    ]
   ]
  }
 },
 "g6-b17": {
  "title": "Ước và bội trong tập hợp số nguyên",
  "facts": [
   "Số nguyên a chia hết cho số nguyên b khác 0 nếu có số nguyên q sao cho a = bq.",
   "Mỗi ước dương của số nguyên khác 0 có một ước âm đối của nó.",
   "Số 0 là bội của mọi số nguyên khác 0. Số chia phải khác 0."
  ],
  "formula": "a = bq với q ∈ ℤ ⇒ b là ước của a.",
  "method": {
   "title": "Liệt kê tất cả ước nguyên",
   "steps": [
    "Liệt kê các cặp thừa số dương của giá trị tuyệt đối.",
    "Lấy cả hai dấu cho mỗi ước dương.",
    "Thử lại các giá trị dễ bị bỏ sót như 1 và chính giá trị tuyệt đối."
   ],
   "worked": [
    [
     "Liệt kê tất cả ước nguyên",
     "Liệt kê các ước nguyên của −18.",
     [
      "Các cặp thừa số dương của 18 là (1; 18), (2; 9), (3; 6).",
      "Lấy cả ước dương và ước âm tương ứng. Ví dụ −18 = (−3) × 6."
     ],
     "±1, ±2, ±3, ±6, ±9, ±18.",
     "Một số nguyên âm có cả ước dương lẫn ước âm."
    ]
   ]
  }
 },
 "g6-b26": {
  "title": "Nhân và chia phân số",
  "facts": [
   "Nhân hai phân số bằng cách nhân tử với tử, mẫu với mẫu.",
   "Nghịch đảo của phân số khác 0 đổi chỗ tử và mẫu. Chia cho một phân số khác 0 là nhân với nghịch đảo của số chia.",
   "Khi thực hiện phép nhân, có thể rút gọn nhân tử chung giữa một tử và một mẫu trước khi nhân."
  ],
  "formula": "\\frac{a}{b}·\\frac{c}{d}=\\frac{ac}{bd} // \\frac{a}{b}:\\frac{c}{d}=\\frac{a}{b}·\\frac{d}{c}, với b,d ≠ 0 và c ≠ 0 khi chia.",
  "method": {
   "title": "Tính thương rồi rút gọn",
   "steps": [
    "Giữ nguyên phân số đứng trước dấu chia.",
    "Đổi phép chia thành nhân và đảo phân số thứ hai.",
    "Xét dấu và rút gọn các nhân tử chung."
   ],
   "worked": [
    [
     "Tính thương rồi rút gọn",
     "Tính \\frac{-14}{15}:\\frac{7}{10}.",
     [
      "Giữ −14/15 và nhân với 10/7.",
      "Rút 14 với 7 được 2, rút 10 với 15 được 2/3.",
      "Tích có một thừa số âm, nên kết quả bằng −4/3."
     ],
     "−4/3.",
     "Số bị chia không đổi chỗ tử và mẫu."
    ]
   ]
  }
 },
 "g6-b33": {
  "title": "Điểm nằm giữa và tia",
  "facts": [
   "Trong ba điểm thẳng hàng phân biệt, chỉ một điểm nằm giữa hai điểm còn lại.",
   "Tia Ax gồm gốc A và phần đường thẳng kéo dài theo hướng x.",
   "Hai tia đối nhau chung gốc, cùng nằm trên một đường thẳng và hướng ngược nhau."
  ],
  "formula": "Nếu M nằm giữa A và B thì AM + MB = AB.",
  "method": {
   "title": "Nhận biết hai tia trùng nhau hay đối nhau",
   "steps": [
    "Chỉ so hai tia có cùng gốc.",
    "Quan sát các điểm xác định hai tia ở cùng phía hay khác phía đối với gốc.",
    "Nếu khác phía trên cùng đường thẳng thì là hai tia đối nhau."
   ],
   "worked": [
    [
     "Nhận biết hai tia trùng nhau hay đối nhau",
     "Trên một đường thẳng có thứ tự P, A, B, C. So sánh tia AB, AC và AP.",
     [
      "B và C ở cùng phía của A nên AB và AC trùng nhau.",
      "P ở phía đối diện với B qua A. AP và AB có chung gốc A và ngược hướng."
     ],
     "AB trùng AC. AP đối AB và AC.",
     "Hai tia có tên khác nhau vẫn có thể trùng nhau nếu cùng gốc và cùng hướng."
    ]
   ]
  }
 },
 "g6-b35": {
  "title": "Trung điểm của đoạn thẳng",
  "facts": [
   "Trung điểm M của AB là điểm thuộc đoạn AB và cách đều hai đầu A, B.",
   "Muốn chứng minh trung điểm cần có cả điều kiện nằm giữa và điều kiện bằng nhau."
  ],
  "formula": "AM = MB = \\frac{AB}{2} khi M là trung điểm AB.",
  "method": {
   "title": "Tìm điểm trung điểm trên một tia",
   "steps": [
    "Xác định thứ tự các điểm từ khoảng cách đến gốc chung.",
    "Tính độ dài còn thiếu bằng hiệu hai đoạn đã biết.",
    "Kiểm tra hai đoạn hai bên điểm xét có bằng nhau không."
   ],
   "worked": [
    [
     "Tìm điểm trung điểm trên một tia",
     "Trên tia Ax lấy M, N sao cho AM = 4 cm và AN = 8 cm. M có là trung điểm AN không?",
     [
      "Cùng trên tia Ax và 4 < 8 nên M nằm giữa A, N.",
      "MN = AN − AM = 8 − 4 = 4 cm, bằng AM."
     ],
     "M là trung điểm AN.",
     "Biết AM = MN vẫn cần kiểm tra M nằm trên đoạn AN."
    ]
   ]
  }
 },
 "g6-b37": {
  "title": "Đo và phân loại góc",
  "facts": [
   "Đặt tâm thước đo trùng với đỉnh góc và vạch 0° trùng một cạnh. Đọc vạch của cạnh còn lại trên đúng thang đo.",
   "Góc nhọn nhỏ hơn 90°, góc vuông bằng 90°, góc tù lớn hơn 90° và nhỏ hơn 180°, góc bẹt bằng 180°."
  ],
  "formula": "0° < góc nhọn < 90° // 90° < góc tù < 180°.",
  "method": {
   "title": "Đọc số đo đúng trên thước hai thang",
   "steps": [
    "Chọn thang đo bắt đầu từ 0° ở cạnh đã đặt trùng.",
    "Đọc giá trị tại cạnh còn lại.",
    "So với hình dạng góc để phát hiện nhầm thang trong và thang ngoài."
   ],
   "worked": [
    [
     "Đọc số đo đúng trên thước hai thang",
     "Hai vạch ở cạnh còn lại ghi 65° và 115°. Cạnh đầu trùng vạch 0° của thang có giá trị 115°. Góc thuộc loại gì?",
     [
      "Dùng thang bắt đầu từ cạnh trùng vạch 0°. Số đo là 115°.",
      "Do 90° < 115° < 180°, đây là góc tù."
     ],
     "115°, góc tù.",
     "65° và 115° nằm cùng vị trí vạch, nhưng chỉ một số đúng theo hướng đo."
    ]
   ]
  }
 },
 "g6-b40": {
  "title": "Đọc và dựng biểu đồ cột",
  "facts": [
   "Trục ngang biểu thị các đối tượng. Trục dọc có đơn vị và vạch chia đều.",
   "Chiều cao cột biểu thị số liệu của đối tượng đó. Khoảng cách các cột giúp phân biệt nhóm.",
   "Biểu đồ phải ghi tên trục hoặc đơn vị để đọc được giá trị."
  ],
  "formula": "Mức chênh lệch = giá trị cột cao hơn − giá trị cột thấp hơn.",
  "method": {
   "title": "Đọc số liệu giữa hai vạch",
   "steps": [
    "Xác định mỗi khoảng chia bằng bao nhiêu đơn vị.",
    "Nội suy theo vị trí đỉnh cột trên trục.",
    "So sánh bằng giá trị đã đọc."
   ],
   "worked": [
    [
     "Đọc số liệu giữa hai vạch",
     "Trục đứng đánh dấu 0, 5, 10, 15. Cột A cao đến 10. Cột B ở chính giữa 10 và 15. B hơn A bao nhiêu?",
     [
      "Mỗi khoảng trên trục bằng 5. Giữa 10 và 15 là 12,5.",
      "Chênh lệch 12,5 − 10 = 2,5."
     ],
     "2,5 đơn vị.",
     "Đọc theo đơn vị trên trục thay vì đếm số vạch."
    ]
   ]
  }
 },
 "g6-b41": {
  "title": "So sánh bằng biểu đồ cột kép",
  "facts": [
   "Mỗi nhóm trên trục ngang có hai cột biểu thị hai dãy số liệu, phân biệt bằng màu hoặc họa tiết trong chú giải.",
   "Dùng chung trục giá trị để so sánh. Cần đọc đúng cặp cột trước khi tính."
  ],
  "formula": "Chênh lệch trong nhóm i = giá trị thứ nhất của nhóm i − giá trị thứ hai của nhóm i.",
  "method": {
   "title": "Tìm nhóm có mức chênh lệch lớn nhất",
   "steps": [
    "Đọc từng cặp theo đúng chú giải.",
    "Nếu chỉ hỏi độ chênh, lấy số lớn trừ số nhỏ.",
    "So kết quả giữa các nhóm."
   ],
   "worked": [
    [
     "Tìm nhóm có mức chênh lệch lớn nhất",
     "Tuần 1: lớp A thu 12 kg giấy, lớp B thu 9 kg. Tuần 2: lớp A thu 14 kg, lớp B thu 16 kg. Tuần nào hai lớp chênh nhiều hơn?",
     [
      "Tuần 1 chênh 12 − 9 = 3 kg.",
      "Tuần 2 chênh 16 − 14 = 2 kg. So 3 với 2."
     ],
     "Tuần 1.",
     "Tuần có tổng cao hơn chưa chắc có độ chênh lớn hơn."
    ]
   ]
  }
 },
 "g6-b43": {
  "title": "Tần suất và xác suất thực nghiệm",
  "facts": [
   "Xác suất thực nghiệm của một sự kiện bằng số lần nó xảy ra chia cho số lần thực hiện thử nghiệm.",
   "Giá trị nằm từ 0 đến 1. Hai mẫu thực nghiệm có thể cho tỉ số khác nhau.",
   "Khi gộp dữ liệu, phải cộng số lần xảy ra và số lần thử riêng."
  ],
  "formula": "P thực nghiệm = \\frac{\\text{số lần xảy ra}}{\\text{tổng số lần thử}}.",
  "method": {
   "title": "Tính tỉ số sau nhiều lượt thử",
   "steps": [
    "Đếm số lần phù hợp với sự kiện trong mỗi đợt.",
    "Cộng số lần thuận lợi và số lần thử riêng.",
    "Rút gọn tỉ số hoặc đổi sang phần trăm nếu đề yêu cầu."
   ],
   "worked": [
    [
     "Tính tỉ số sau nhiều lượt thử",
     "Bạn An tung được 5 mặt ngửa trong 12 lần. Bạn Bình tung được 11 mặt ngửa trong 20 lần. Tìm xác suất thực nghiệm khi gộp.",
     [
      "Có 5 + 11 = 16 lần ngửa trong 12 + 20 = 32 lần thử.",
      "Tỉ số 16/32 = 1/2."
     ],
     "50%.",
     "Hai số lần thử khác nhau nên không lấy trung bình cộng hai phần trăm."
    ]
   ]
  }
 },
 "g7-b4": {
  "title": "Thứ tự phép tính và chuyển vế",
  "facts": [
   "Tính trong ngoặc trước, sau đó theo thứ tự lũy thừa, nhân chia, cộng trừ.",
   "Khi chuyển một số hạng qua dấu bằng, đổi dấu số hạng đó. Quy tắc này là kết quả của việc cộng cùng số đối vào hai vế.",
   "Nhân hoặc chia cả hai vế của đẳng thức cho cùng số khác 0 giữ đẳng thức đúng."
  ],
  "formula": "x + a = b ⇔ x = b − a.",
  "method": {
   "title": "Tìm số hữu tỉ chưa biết",
   "steps": [
    "Giữ x ở một vế và chuyển số hạng đã biết sang vế kia.",
    "Quy đồng khi cộng hoặc trừ phân số.",
    "Thế lại nghiệm vào đẳng thức ban đầu."
   ],
   "worked": [
    [
     "Tìm số hữu tỉ chưa biết",
     "Tìm x sao cho x − 3/8 = −1/6.",
     [
      "Chuyển −3/8 sang phải: x = −1/6 + 3/8.",
      "Quy đồng mẫu 24: x = −4/24 + 9/24 = 5/24."
     ],
     "5/24.",
     "Đổi dấu của số hạng chuyển vế, không đổi dấu cả vế."
    ]
   ]
  }
 },
 "g7-b11": {
  "title": "Giả thiết, kết luận và chứng minh định lí",
  "facts": [
   "Giả thiết là điều kiện được cho. Kết luận là điều cần suy ra.",
   "Có thể viết định lí theo dạng “Nếu … thì …”. Một chứng minh dùng định nghĩa, tiên đề hoặc định lí đã biết để đi từ giả thiết tới kết luận.",
   "Đổi chỗ giả thiết và kết luận tạo ra mệnh đề đảo. Mệnh đề đảo phải được kiểm tra riêng."
  ],
  "formula": "a ∥ b và b ∥ c ⇒ a ∥ c nếu các đường thẳng đang xét phân biệt và cùng nằm trong mặt phẳng.",
  "method": {
   "title": "Viết chứng minh qua góc trung gian",
   "steps": [
    "Ghi rõ dữ kiện và điều cần chứng minh.",
    "Chọn cát tuyến chung để tạo cặp góc so le trong hoặc đồng vị.",
    "Dùng tính chất song song để lập đẳng thức góc rồi dùng dấu hiệu nhận biết."
   ],
   "worked": [
    [
     "Viết chứng minh qua góc trung gian",
     "Trong cùng mặt phẳng, a ∥ b và b ∥ c, với a, b, c phân biệt. Chứng minh a ∥ c bằng tính chất góc.",
     [
      "Lấy một đường thẳng cắt b và không song song với b. Nó cắt cả a và c.",
      "Các góc đồng vị tại a và b bằng nhau, tại b và c cũng bằng nhau.",
      "Hai góc đồng vị của a và c bằng nhau, suy ra a ∥ c."
     ],
     "a ∥ c.",
     "Khi dùng tính chất bắc cầu cần biết a và c phân biệt."
    ]
   ]
  }
 },
 "g7-b14": {
  "title": "Hai trường hợp cạnh – góc – cạnh và góc – cạnh – góc",
  "facts": [
   "Trường hợp c.g.c. cần hai cạnh và góc xen giữa tương ứng bằng nhau.",
   "Trường hợp g.c.g. cần một cạnh và hai góc kề cạnh ấy tương ứng bằng nhau.",
   "Thứ tự tên các đỉnh trong hai tam giác phải phản ánh đúng sự tương ứng."
  ],
  "formula": "Nếu AB = DE, AC = DF, góc BAC = góc EDF thì △ABC = △DEF.",
  "method": {
   "title": "Chọn đúng trường hợp bằng nhau",
   "steps": [
    "Đánh dấu các cặp dữ kiện tương ứng trên hình.",
    "Kiểm tra góc nằm giữa hai cạnh hay cạnh nằm giữa hai góc.",
    "Viết tên hai tam giác cùng thứ tự rồi suy ra đại lượng cần tìm."
   ],
   "worked": [
    [
     "Chọn đúng trường hợp bằng nhau",
     "Cho AB = DE, góc A = góc D, góc B = góc E, BC = 7 cm. Tính EF.",
     [
      "Cạnh AB kề cả góc A và B. Cạnh DE kề cả góc D và E.",
      "Áp dụng g.c.g. với A ↔ D, B ↔ E, C ↔ F. Suy ra BC = EF."
     ],
     "7 cm.",
     "Hai góc bằng nhau riêng lẻ cho đồng dạng. Cạnh tương ứng bằng nhau mới cho bằng nhau ở dạng này."
    ]
   ]
  }
 },
 "g7-b27": {
  "title": "Nhân đa thức một biến",
  "facts": [
   "Khi nhân hai đơn thức, nhân hệ số và cộng số mũ của cùng biến.",
   "Khi nhân hai đa thức, mỗi hạng tử của đa thức thứ nhất nhân với mọi hạng tử của đa thức thứ hai.",
   "Sau khai triển, gộp hạng tử đồng dạng và viết theo bậc giảm dần."
  ],
  "formula": "x^m·x^n = x^{m+n} // (a+b)(c+d)=ac+ad+bc+bd.",
  "method": {
   "title": "Nhân hai nhị thức rồi kiểm tra bậc",
   "steps": [
    "Lập đủ bốn tích và giữ đúng dấu mỗi hạng tử.",
    "Nhóm các tích có cùng số mũ.",
    "Đối chiếu hệ số đầu và hệ số tự do với tích hai hệ số tương ứng."
   ],
   "worked": [
    [
     "Nhân hai nhị thức rồi kiểm tra bậc",
     "Khai triển (2x − 3)(x + 4).",
     [
      "Bốn tích là 2x², 8x, −3x, −12.",
      "Gộp 8x − 3x = 5x.",
      "Hệ số tự do −12 khớp với (−3) × 4."
     ],
     "2x² + 5x − 12.",
     "Hạng tử −3 phải nhân với cả x và 4."
    ]
   ]
  }
 },
 "g7-b28": {
  "title": "Chia đa thức một biến",
  "facts": [
   "Sắp xếp đa thức theo lũy thừa giảm dần. Mỗi bước chia hạng tử đầu của số bị chia hiện tại cho hạng tử đầu của số chia.",
   "Nhân hạng tử thương với cả số chia, rồi trừ để tạo phần dư mới.",
   "Dừng khi phần dư bằng 0 hoặc có bậc nhỏ hơn số chia."
  ],
  "formula": "P(x)=D(x)Q(x)+R(x), với R=0 hoặc bậc R nhỏ hơn bậc D.",
  "method": {
   "title": "Tìm thương và dư bằng chia từng bước",
   "steps": [
    "Chia hạng tử bậc lớn nhất trước.",
    "Nhân ngược và trừ từng hạng tử có cùng bậc.",
    "Kiểm tra bằng DQ + R."
   ],
   "worked": [
    [
     "Tìm thương và dư bằng chia từng bước",
     "Chia 2x² + 5x + 5 cho x + 2.",
     [
      "Bước đầu được 2x. Trừ 2x² + 4x thì còn x + 5.",
      "Bước sau được 1. Trừ x + 2 thì còn 3.",
      "Kiểm tra (x + 2)(2x + 1) + 3 = 2x² + 5x + 5."
     ],
     "Thương 2x + 1, dư 3.",
     "Nếu phần dư còn cùng bậc với số chia thì vẫn phải chia tiếp."
    ]
   ]
  }
 },
 "g7-b32": {
  "title": "Đường vuông góc và đường xiên",
  "facts": [
   "Từ điểm A ngoài đường thẳng d, đoạn AH vuông góc với d ngắn hơn mọi đoạn AM với M thuộc d và M ≠ H.",
   "H là hình chiếu của A trên d. Đoạn HM là hình chiếu của đường xiên AM trên d.",
   "Với cùng điểm A và cùng đường thẳng d, hình chiếu dài hơn thì đường xiên tương ứng dài hơn."
  ],
  "formula": "Nếu HM < HN thì AM < AN, với H là chân đường vuông góc từ A xuống d.",
  "method": {
   "title": "So sánh các đường xiên qua hình chiếu",
   "steps": [
    "Xác định đúng chân đường vuông góc.",
    "So sánh các khoảng cách từ chân H đến điểm cuối của mỗi đường xiên.",
    "Kết luận về đường xiên theo cùng thứ tự."
   ],
   "worked": [
    [
     "So sánh các đường xiên qua hình chiếu",
     "AH ⊥ d tại H. Hai điểm M, N thuộc d với HM = 4 cm, HN = 6 cm. So sánh AH, AM, AN.",
     [
      "AH là đường vuông góc nên ngắn hơn cả hai đường xiên.",
      "HM < HN nên AM < AN."
     ],
     "AH < AM < AN.",
     "M và N có thể ở hai phía của H. Quy tắc so độ dài hình chiếu vẫn đúng."
    ]
   ]
  }
 },
 "g8-b4": {
  "title": "Nhân các đa thức nhiều biến",
  "facts": [
   "Nhân hai đơn thức bằng cách nhân hệ số và cộng số mũ ở từng biến trùng tên.",
   "Khi nhân hai đa thức, phân phối từng hạng tử của đa thức thứ nhất vào toàn bộ đa thức thứ hai.",
   "Chỉ thu gọn các hạng tử có toàn bộ phần biến giống nhau."
  ],
  "formula": "(A+B)(C+D)=AC+AD+BC+BD.",
  "method": {
   "title": "Khai triển và tìm hệ số của một hạng tử",
   "steps": [
    "Liệt kê từng tích cùng dấu đúng.",
    "Tìm các tích tạo đúng phần biến đề hỏi.",
    "Cộng các hệ số tương ứng, kể cả trường hợp triệt tiêu."
   ],
   "worked": [
    [
     "Khai triển và tìm hệ số của một hạng tử",
     "Tìm hệ số của xy trong (2x−y)(3x+4y).",
     [
      "Khai triển được 6x²+8xy−3xy−4y².",
      "Hai tích tạo xy có hệ số 8 và −3. Tổng bằng 5."
     ],
     "Hệ số của xy là 5.",
     "x² và xy khác phần biến nên không gộp."
    ]
   ]
  }
 },
 "g8-b11": {
  "title": "Tính chất và dấu hiệu hình thang cân",
  "facts": [
   "Hình thang cân có hai góc kề một đáy bằng nhau. Hai cạnh bên và hai đường chéo tương ứng bằng nhau.",
   "Hình thang có hai đường chéo bằng nhau là hình thang cân.",
   "Khi dùng dấu hiệu, cần chứng minh có một cặp cạnh đối song song trước."
  ],
  "formula": "Nếu AB ∥ CD và AC = BD thì hình thang ABCD là hình thang cân.",
  "method": {
   "title": "Dùng đường chéo để nhận dạng hình thang",
   "steps": [
    "Xác nhận AB và CD là hai đáy.",
    "So sánh hai đường chéo AC và BD.",
    "Áp dụng dấu hiệu hình thang cân rồi suy ra góc hoặc cạnh cần tìm."
   ],
   "worked": [
    [
     "Dùng đường chéo để nhận dạng hình thang",
     "Cho hình thang ABCD có AB ∥ CD, AC = BD, góc A = 70°. Tính góc B và góc D.",
     [
      "Hai đường chéo bằng nhau nên hình thang cân, góc B bằng góc A.",
      "A và D là hai góc trong cùng phía khi AD cắt hai đáy song song, nên góc D = 180° − 70°."
     ],
     "Góc B = 70°, góc D = 110°.",
     "Hai góc kề cùng một đáy bằng nhau, hai góc kề cùng một cạnh bên bù nhau."
    ]
   ]
  }
 },
 "g8-b24": {
  "title": "Nhân và chia phân thức đại số",
  "facts": [
   "Tích hai phân thức được lập bằng tích tử và tích mẫu.",
   "Muốn chia cho phân thức khác 0, nhân với phân thức nghịch đảo của nó.",
   "Điều kiện xác định của phép chia gồm mọi mẫu ban đầu khác 0 và tử của số chia khác 0."
  ],
  "formula": "\\frac{A}{B}:\\frac{C}{D}=\\frac{AD}{BC}, với B,C,D ≠ 0.",
  "method": {
   "title": "Chia phân thức rồi giữ điều kiện ban đầu",
   "steps": [
    "Ghi giá trị bị loại từ các mẫu và tử số của số chia.",
    "Đổi thành phép nhân nghịch đảo.",
    "Phân tích thành nhân tử rồi triệt tiêu nhân tử chung."
   ],
   "worked": [
    [
     "Chia phân thức rồi giữ điều kiện ban đầu",
     "Rút gọn \\frac{x²-4}{x+1}:\\frac{x-2}{x}.",
     [
      "Điều kiện x ≠ −1, 0, 2.",
      "Đổi thành \\frac{(x-2)(x+2)}{x+1}·\\frac{x}{x-2}.",
      "Triệt tiêu x − 2, giữ nguyên các điều kiện."
     ],
     "\\frac{x(x+2)}{x+1}, với x ≠ −1, 0, 2.",
     "Giá trị x = 2 vẫn bị loại dù x − 2 đã triệt tiêu."
    ]
   ]
  }
 },
 "g8-b27": {
  "title": "Khái niệm hàm số và điểm trên đồ thị",
  "facts": [
   "Một quy tắc xác định hàm số nếu mỗi giá trị x trong tập xét cho đúng một giá trị y.",
   "Hai giá trị x khác nhau có thể cho cùng một y.",
   "Điểm M(x₀; y₀) thuộc đồ thị y = f(x) khi x₀ thuộc tập xác định và f(x₀) = y₀."
  ],
  "formula": "M(x₀; y₀) thuộc đồ thị ⇔ y₀=f(x₀), với x₀ thuộc tập xác định.",
  "method": {
   "title": "Kiểm tra điểm thuộc đồ thị",
   "steps": [
    "Đọc hoành độ, tung độ theo đúng thứ tự.",
    "Thay hoành độ vào hàm số.",
    "So kết quả với tung độ đề cho."
   ],
   "worked": [
    [
     "Kiểm tra điểm thuộc đồ thị",
     "Điểm nào trong A(−2; 5), B(2; 5), C(5; 2) thuộc đồ thị y = x² + 1?",
     [
      "Tại x = −2 và x = 2, giá trị hàm đều bằng 5.",
      "Tại x = 5, giá trị hàm bằng 26, khác 2."
     ],
     "A và B.",
     "Việc hai hoành độ có cùng tung độ không vi phạm định nghĩa hàm số."
    ]
   ]
  }
 },
 "g8-b31": {
  "title": "Tính xác suất bằng tỉ số",
  "facts": [
   "Liệt kê kết quả của một phép thử sao cho mỗi kết quả là một trường hợp riêng.",
   "Khi các kết quả có cùng khả năng xảy ra, xác suất của biến cố là tỉ số số kết quả thuận lợi và tổng số kết quả.",
   "Xác suất của biến cố chắc chắn bằng 1, biến cố không thể bằng 0."
  ],
  "formula": "P(A)=\\frac{n(A)}{n(Ω)} với các kết quả đồng khả năng.",
  "method": {
   "title": "Đếm kết quả thỏa đồng thời hai điều kiện",
   "steps": [
    "Xác định toàn bộ kết quả đồng khả năng.",
    "Chọn những kết quả thỏa cả hai điều kiện.",
    "Đếm và lập tỉ số."
   ],
   "worked": [
    [
     "Đếm kết quả thỏa đồng thời hai điều kiện",
     "Rút ngẫu nhiên một thẻ từ 1 đến 12. Tính xác suất rút được số chẵn và lớn hơn 5.",
     [
      "Có 12 thẻ đồng khả năng.",
      "Các số thỏa cả hai điều kiện là 6, 8, 10, 12. Có bốn thẻ.",
      "Tỉ số bằng 4/12."
     ],
     "1/3.",
     "Từ “và” yêu cầu thỏa đồng thời, không cộng hai nhóm riêng."
    ]
   ]
  }
 },
 "g8-b34": {
  "title": "Ba trường hợp đồng dạng của tam giác",
  "facts": [
   "c.c.c. dùng ba cặp cạnh tương ứng tỉ lệ.",
   "c.g.c. dùng hai cặp cạnh tương ứng tỉ lệ và hai góc xen giữa bằng nhau.",
   "g.g. dùng hai cặp góc tương ứng bằng nhau. Góc còn lại bằng nhau vì tổng ba góc mỗi tam giác là 180°."
  ],
  "formula": "△ABC ∼ △DEF ⇒ \\frac{AB}{DE}=\\frac{AC}{DF}=\\frac{BC}{EF}.",
  "method": {
   "title": "Chọn tiêu chuẩn đồng dạng từ dữ kiện",
   "steps": [
    "Ghép cặp đỉnh trước khi lập tỉ số.",
    "Kiểm tra các cạnh đã cho và vị trí của góc.",
    "Viết thứ tự tam giác đúng rồi tính cạnh cần tìm."
   ],
   "worked": [
    [
     "Chọn tiêu chuẩn đồng dạng từ dữ kiện",
     "Cho AB = 6, AC = 9, DE = 4, DF = 6 và góc A bằng góc D. Nếu EF = 8 thì BC bằng bao nhiêu?",
     [
      "6/4 = 9/6 = 3/2. Hai góc bằng nhau nằm xen giữa các cặp cạnh đó.",
      "Áp dụng c.g.c. theo thứ tự A ↔ D, B ↔ E, C ↔ F.",
      "BC = 8 × 3/2 = 12."
     ],
     "BC = 12.",
     "Góc bằng nhau phải là góc xen giữa hai cạnh được dùng."
    ]
   ]
  }
 },
 "g8-b37": {
  "title": "Hình đồng dạng và tỉ số kích thước",
  "facts": [
   "Hai hình đồng dạng có cùng hình dạng sau khi phóng to hoặc thu nhỏ theo cùng tỉ số.",
   "Các độ dài tương ứng nhân với k. Chu vi của đa giác tương ứng cũng nhân với k. Diện tích nhân với k².",
   "Cùng tăng chiều dài và chiều rộng thêm một số không bảo đảm giữ hình dạng."
  ],
  "formula": "P₂ = kP₁ // S₂ = k²S₁.",
  "method": {
   "title": "Kiểm tra bản vẽ phóng to",
   "steps": [
    "Tìm cặp độ dài tương ứng thứ nhất để tính k.",
    "Kiểm tra cặp còn lại có cùng tỉ số.",
    "Dùng k hoặc k² tùy bài hỏi độ dài hay diện tích."
   ],
   "worked": [
    [
     "Kiểm tra bản vẽ phóng to",
     "Một ảnh 6 cm × 9 cm được in thành 10 cm × 15 cm. Hỏi có giữ tỉ lệ không và diện tích tăng bao nhiêu lần?",
     [
      "10/6 = 15/9 = 5/3 nên hai kích thước cùng nhân 5/3.",
      "Tỉ số diện tích là (5/3)²."
     ],
     "Giữ tỉ lệ. Diện tích bằng 25/9 lần bản đầu.",
     "Không dùng 5/3 làm tỉ số diện tích."
    ]
   ]
  }
 },
 "g9-b5": {
  "title": "Tính chất của bất đẳng thức",
  "facts": [
   "Cộng cùng một số vào hai vế giữ chiều bất đẳng thức.",
   "Nhân hoặc chia hai vế cho cùng một số dương giữ chiều. Nếu số đó âm thì đảo chiều.",
   "Tính chất bắc cầu cho phép nối hai so sánh cùng chiều."
  ],
  "formula": "a < b, c < 0 ⇒ ac > bc // a < b, c > 0 ⇒ ac < bc.",
  "method": {
   "title": "Biến đổi hai vế theo cùng một quy tắc",
   "steps": [
    "Nhận ra thao tác chung được áp dụng cho cả hai vế.",
    "Xét dấu số nhân hoặc số chia.",
    "Kiểm tra chiều của bất đẳng thức sau mỗi thao tác."
   ],
   "worked": [
    [
     "Biến đổi hai vế theo cùng một quy tắc",
     "Cho a < b. So sánh 5 − 2a và 5 − 2b.",
     [
      "Nhân a < b với −2, được −2a > −2b.",
      "Cộng 5 vào hai vế giữ chiều >."
     ],
     "5 − 2a > 5 − 2b.",
     "Số 5 giống nhau ở hai vế, việc đổi chiều đến từ hệ số −2."
    ]
   ]
  }
 },
 "g9-b15": {
  "title": "Cung tròn, hình quạt và hình vành khuyên",
  "facts": [
   "Cung có góc ở tâm n° chiếm n/360 của chu vi. Hình quạt tương ứng chiếm cùng tỉ phần của diện tích hình tròn.",
   "Diện tích vành khuyên là hiệu hai diện tích hình tròn đồng tâm.",
   "Độ dài dùng đơn vị dài, diện tích dùng đơn vị vuông."
  ],
  "formula": "l=\\frac{πRn}{180} // S quạt = \\frac{πR²n}{360} // S vành = π(R²−r²).",
  "method": {
   "title": "Tính độ dài cung và diện tích quạt",
   "steps": [
    "Đọc bán kính và góc ở tâm.",
    "Tính tỉ phần của cả vòng tròn.",
    "Nhân với chu vi để tìm độ dài và với diện tích để tìm diện tích quạt."
   ],
   "worked": [
    [
     "Tính độ dài cung và diện tích quạt",
     "Hình quạt có bán kính 9 cm và góc ở tâm 80°. Tính độ dài cung và diện tích quạt.",
     [
      "Tỉ phần là 80/360 = 2/9.",
      "Chu vi cả đường tròn bằng 18π, nên cung dài 4π.",
      "Diện tích cả hình tròn bằng 81π, nên quạt có diện tích 18π."
     ],
     "4π cm và 18π cm².",
     "Mẫu 180 trong công thức độ dài đã được rút từ 2πR. Diện tích dùng mẫu 360."
    ]
   ]
  }
 },
 "g10-b9": {
  "title": "Nhân vectơ với một số và điều kiện cùng phương",
  "facts": [
   "Với vectơ khác 0, tích k nhân vectơ có độ dài bằng giá trị tuyệt đối của k nhân độ dài ban đầu.",
   "Nếu k > 0, hai vectơ cùng hướng. Nếu k < 0, hai vectơ ngược hướng. Khi k = 0, tích là vectơ không.",
   "Một vectơ cùng phương với vectơ khác 0 khi biểu diễn được thành một bội thực của vectơ đó."
  ],
  "formula": "\\vec{u}=k\\vec{v} ⇒ ∣\\vec{u}∣=∣k∣∣\\vec{v}∣.",
  "method": {
   "title": "Xác định hướng và độ dài từ hệ số",
   "steps": [
    "Viết vectơ cần xét dưới dạng k lần một vectơ đã biết.",
    "Dùng dấu k để đọc hướng.",
    "Dùng giá trị tuyệt đối của k để tính độ dài."
   ],
   "worked": [
    [
     "Xác định hướng và độ dài từ hệ số",
     "Cho \\vec{MN}=−\\frac{3}{2}\\vec{AB} và AB=8. Tìm MN và hướng của hai vectơ.",
     [
      "Hệ số k = −3/2 là số âm nên hai vectơ ngược hướng.",
      "Độ dài MN bằng 3/2 × 8 = 12."
     ],
     "MN = 12 và hai vectơ ngược hướng.",
     "Dấu âm chỉ hướng. Độ dài luôn không âm."
    ]
   ]
  }
 },
 "g12-b5": {
  "title": "Mô hình hóa bài toán tối ưu bằng đạo hàm",
  "facts": [
   "Viết đại lượng cần tối ưu thành hàm một biến nhờ dùng điều kiện ràng buộc.",
   "Miền xác định thực tế đến từ kích thước, thời gian hoặc giới hạn tài nguyên.",
   "Trên đoạn đóng, xét các điểm tới hạn bên trong và cả hai đầu. Trên khoảng mở, dùng dấu đạo hàm hoặc giới hạn ở biên để kết luận."
  ],
  "formula": "Nếu f′ đổi dấu từ dương sang âm tại x₀ và tăng rồi giảm trên toàn miền thì f(x₀) là giá trị lớn nhất.",
  "method": {
   "title": "Tối ưu thể tích hộp không nắp",
   "steps": [
    "Đặt x là cạnh hình vuông bị cắt và tìm khoảng x làm kích thước dương.",
    "Lập thể tích từ chiều cao x và hai cạnh đáy sau khi cắt.",
    "Tính đạo hàm, giữ điểm tới hạn thuộc miền rồi xét dấu."
   ],
   "worked": [
    [
     "Tối ưu thể tích hộp không nắp",
     "Từ tấm bìa vuông cạnh 24 cm, cắt bốn hình vuông cạnh x ở góc để gấp hộp không nắp. Tìm x cho thể tích lớn nhất.",
     [
      "Điều kiện 0 < x < 12. V(x)=x(24−2x)².",
      "V′(x)=12(x−4)(x−12). Trên (0;4) tích dương, trên (4;12) tích âm.",
      "V lớn nhất tại x=4. Khi đó đáy 16 cm × 16 cm, thể tích 1024 cm³."
     ],
     "Cắt hình vuông cạnh 4 cm. Thể tích lớn nhất 1024 cm³.",
     "Nghiệm x = 12 không thuộc miền kích thước dương."
    ]
   ]
  }
 },
 "g6-b1": {
  "title": "Hai cách viết tập hợp và đếm phần tử",
  "facts": [
   "Khi liệt kê, viết mỗi phần tử đúng một lần trong ngoặc nhọn. Thứ tự các phần tử không làm thay đổi tập hợp.",
   "Khi mô tả bằng tính chất, ghi tập số mà biến thuộc vào và mọi điều kiện cần thỏa.",
   "Một tập hữu hạn có thể viết theo cả hai cách. Với tập vô hạn, mô tả bằng tính chất giúp tránh viết thiếu."
  ],
  "formula": "A = {x ∈ ℕ : 3 ≤ x < 8} = {3; 4; 5; 6; 7}.",
  "method": {
   "title": "Chuyển từ điều kiện sang liệt kê",
   "steps": [
    "Đọc cận dưới, cận trên và dấu bằng đi kèm.",
    "Liệt kê các số nguyên nằm giữa các cận, rồi giữ số thỏa điều kiện phụ.",
    "Kiểm tra từng phần tử thuộc tập số được chỉ định."
   ],
   "worked": [
    [
     "Chuyển từ điều kiện sang liệt kê",
     "Viết bằng cách liệt kê tập hợp số tự nhiên chẵn lớn hơn 3 và không vượt quá 12.",
     [
      "Các số tự nhiên trong phạm vi từ 4 đến 12.",
      "Giữ các số chia hết cho 2, gồm 4, 6, 8, 10, 12.",
      "Vì điều kiện là không vượt quá 12, số 12 được lấy."
     ],
     "{4; 6; 8; 10; 12}.",
     "“Không vượt quá” bao gồm giá trị ở đầu mút trên."
    ]
   ]
  }
 },
 "g6-b6": {
  "title": "Chu kỳ chữ số tận cùng của lũy thừa",
  "facts": [
   "Chữ số tận cùng của một tích chỉ phụ thuộc vào chữ số tận cùng của các thừa số.",
   "Khi nhân liên tiếp với một cơ số cố định, hãy theo dõi chữ số hàng đơn vị. Khi quay lại một chữ số đã gặp, dãy bắt đầu lặp.",
   "Số dư 0 ứng với vị trí cuối của một chu kỳ bắt đầu ở số mũ 1."
  ],
  "formula": "7¹, 7², 7³, 7⁴ có chữ số cuối lần lượt 7, 9, 3, 1.",
  "method": {
   "title": "Tìm chữ số cuối của lũy thừa lớn",
   "steps": [
    "Lập một vòng lặp từ số mũ 1.",
    "Chia số mũ cho độ dài vòng lặp.",
    "Đọc vị trí theo số dư, dùng phần tử cuối nếu dư 0."
   ],
   "worked": [
    [
     "Tìm chữ số cuối của lũy thừa lớn",
     "Tìm chữ số tận cùng của 7^{2026}.",
     [
      "Chu kỳ 4 chữ số là 7, 9, 3, 1.",
      "2026 = 4 × 506 + 2. Chọn chữ số thứ hai."
     ],
     "9.",
     "Chỉ cần nhân các chữ số hàng đơn vị, không cần tính lũy thừa lớn."
    ]
   ]
  }
 },
 "g7-b3": {
  "title": "So sánh lũy thừa của số hữu tỉ",
  "facts": [
   "Lũy thừa của số âm có dấu dương khi số mũ chẵn, dấu âm khi số mũ lẻ.",
   "Nếu 0 < a < 1 thì a^m > a^n khi m < n. Mỗi lần nhân với a làm giá trị nhỏ hơn.",
   "Có thể đưa về cùng cơ số hoặc cùng số mũ trước khi so sánh."
  ],
  "formula": "(a^m)^n = a^{mn} // a^m·a^n = a^{m+n}.",
  "method": {
   "title": "Đưa hai số về cùng cơ số nhỏ hơn 1",
   "steps": [
    "Viết mỗi cơ số thành lũy thừa của cùng một số hữu tỉ.",
    "Dùng quy tắc lũy thừa của lũy thừa.",
    "Xét cơ số lớn hơn hay nhỏ hơn 1 để chọn chiều so sánh."
   ],
   "worked": [
    [
     "Đưa hai số về cùng cơ số nhỏ hơn 1",
     "So sánh (1/2)^7 và (1/4)^3.",
     [
      "1/4 = (1/2)^2, nên (1/4)^3 = (1/2)^6.",
      "Cơ số 1/2 nằm giữa 0 và 1. Nhân thêm 1/2 làm giá trị nhỏ hơn."
     ],
     "(1/2)^7 < (1/4)^3.",
     "Với cơ số nhỏ hơn 1, số mũ lớn hơn cho giá trị nhỏ hơn."
    ]
   ]
  }
 },
 "g7-b23": {
  "title": "Nhận ra hai đại lượng tỉ lệ nghịch",
  "facts": [
   "Hai đại lượng x, y tỉ lệ nghịch khi tích xy là hằng số khác 0.",
   "Trong bài toán năng suất, tích số người và số ngày chỉ không đổi nếu khối lượng công việc cố định và năng suất mỗi người như nhau.",
   "Khi x tăng gấp k lần, y giảm còn 1/k giá trị cũ."
  ],
  "formula": "xy = a // \\frac{x_1}{x_2}=\\frac{y_2}{y_1}.",
  "method": {
   "title": "Tính thời gian khi đổi số người",
   "steps": [
    "Ghi rõ điều kiện về khối lượng và năng suất.",
    "Tính tích số người với thời gian ở tình huống ban đầu.",
    "Chia tích cho số người mới."
   ],
   "worked": [
    [
     "Tính thời gian khi đổi số người",
     "Tám người làm xong một công việc trong 15 ngày. Nếu 12 người làm với cùng năng suất mỗi người, mất bao lâu?",
     [
      "Khối lượng công việc là 8 × 15 = 120 ngày công.",
      "Mười hai người cần 120/12 ngày."
     ],
     "10 ngày.",
     "Số người tăng thì thời gian giảm nếu công việc giữ nguyên."
    ]
   ]
  }
 },
 "g8-b2": {
  "title": "Bậc của đa thức sau khi thu gọn",
  "facts": [
   "Bậc của một hạng tử nhiều biến khác 0 là tổng số mũ các biến trong hạng tử đó.",
   "Bậc của đa thức khác 0 là bậc lớn nhất trong số các hạng tử còn lại sau khi thu gọn.",
   "Nếu hệ số của các hạng tử bậc lớn triệt tiêu, bậc đa thức có thể giảm."
  ],
  "formula": "2x²y−2x²y+xy²+x = xy²+x có bậc 3.",
  "method": {
   "title": "Tìm hệ số để bậc giảm",
   "steps": [
    "Gộp các hạng tử có cùng phần biến.",
    "Đặt hệ số hạng tử bậc lớn hơn mức đề yêu cầu bằng 0.",
    "Kiểm tra còn ít nhất một hạng tử có bậc bằng mức yêu cầu."
   ],
   "worked": [
    [
     "Tìm hệ số để bậc giảm",
     "Tìm m để P = (m−2)x³y+3xy²−2xy²+5 có bậc 3.",
     [
      "P = (m−2)x³y+xy²+5. Hạng tử x³y có bậc 4.",
      "Để bỏ hạng tử bậc 4, đặt m−2 = 0.",
      "Khi m=2, hạng tử xy² vẫn có bậc 3."
     ],
     "m = 2.",
     "Đừng đọc bậc từ biểu thức chưa thu gọn."
    ]
   ]
  }
 },
 "g8-b13": {
  "title": "Dùng trung tuyến của tam giác vuông để tìm độ dài",
  "facts": [
   "Trong hình chữ nhật, hai đường chéo bằng nhau và cắt nhau tại trung điểm của mỗi đường.",
   "Trong tam giác vuông, trung điểm cạnh huyền cách đều ba đỉnh. Tính chất này có thể thấy bằng cách ghép thêm một tam giác để tạo hình chữ nhật."
  ],
  "formula": "△ABC vuông tại A, M là trung điểm BC ⇒ MA=MB=MC=\\frac{BC}{2}.",
  "method": {
   "title": "Tìm cạnh khi đề cho trung tuyến tới cạnh huyền",
   "steps": [
    "Chỉ ra tam giác vuông và cạnh huyền.",
    "Nhân đôi trung tuyến xuất phát từ góc vuông để có cạnh huyền.",
    "Dùng Pythagore nếu cần tìm cạnh góc vuông."
   ],
   "worked": [
    [
     "Tìm cạnh khi đề cho trung tuyến tới cạnh huyền",
     "△ABC vuông tại A, AM là trung tuyến, AM = 6,5 cm và AB = 5 cm. Tính AC.",
     [
      "Cạnh huyền BC = 2AM = 13 cm.",
      "AC² = 13²−5² = 144. Lấy căn dương."
     ],
     "AC = 12 cm.",
     "Kết quả nửa cạnh huyền chỉ dành cho trung tuyến ứng với cạnh huyền."
    ]
   ]
  }
 },
 "g9-b2": {
  "title": "Chọn khử ẩn bằng phép cộng đại số",
  "facts": [
   "Nhân cả hai vế của một phương trình với số khác 0 cho phương trình tương đương.",
   "Có thể thay một phương trình bằng tổng hoặc hiệu của nó với phương trình còn lại.",
   "Sau khi khử một ẩn, thế nghiệm vào phương trình đơn giản hơn và kiểm tra cả hai dòng."
  ],
  "formula": "3x+2y=7 và 5x−2y=9 ⇒ 8x=16.",
  "method": {
   "title": "Giải hệ khi hệ số một ẩn đối nhau",
   "steps": [
    "Viết hai phương trình cùng thứ tự x, y.",
    "Cộng hai phương trình khi hệ số của một ẩn đối nhau.",
    "Tìm ẩn thứ hai rồi thế kiểm tra."
   ],
   "worked": [
    [
     "Giải hệ khi hệ số một ẩn đối nhau",
     "Giải hệ 3x + 2y = 7 và 5x − 2y = 9.",
     [
      "Cộng hai vế từng phương trình, được 8x = 16, nên x = 2.",
      "Thế vào 3x + 2y = 7, được 2y = 1.",
      "Kiểm tra 5 × 2 − 2 × 0,5 = 9."
     ],
     "(x; y) = (2; 0,5).",
     "Sau khi tìm x, vẫn phải tìm y và ghi nghiệm có thứ tự."
    ]
   ]
  }
 },
 "g9-b9": {
  "title": "Trục căn ở mẫu bằng liên hợp",
  "facts": [
   "Với A,B ≥ 0, tích hai liên hợp √A−√B và √A+√B bằng A−B.",
   "Nếu mẫu có dạng tổng hoặc hiệu hai căn và liên hợp khác 0, nhân cả tử và mẫu với liên hợp.",
   "Rút gọn kết quả nhưng giữ điều kiện xác định của biểu thức ban đầu."
  ],
  "formula": "(√A−√B)(√A+√B)=A−B.",
  "method": {
   "title": "Trục căn trong mẫu có hai số hạng",
   "steps": [
    "Chọn liên hợp bằng cách đổi dấu giữa hai số hạng.",
    "Nhân cả tử và mẫu với cùng biểu thức khác 0.",
    "Dùng hiệu hai bình phương và rút gọn."
   ],
   "worked": [
    [
     "Trục căn trong mẫu có hai số hạng",
     "Viết \\frac{6}{√7-1} dưới dạng mẫu hữu tỉ.",
     [
      "Liên hợp là √7 + 1.",
      "Mẫu mới bằng (√7−1)(√7+1)=7−1=6.",
      "Tử mới là 6(√7+1). Rút 6."
     ],
     "√7 + 1.",
     "Nhân cả tử lẫn mẫu. Chỉ thay mẫu sẽ đổi giá trị phân thức."
    ]
   ]
  }
 },
 "g10-b6": {
  "title": "Dùng định lí sin để tìm bán kính ngoại tiếp",
  "facts": [
   "Trong tam giác, mỗi cạnh chia cho sin của góc đối diện bằng đường kính đường tròn ngoại tiếp.",
   "Nếu biết góc xen giữa hai cạnh, có thể tìm cạnh đối diện bằng định lí côsin trước.",
   "Diện tích tam giác cho phép kiểm tra kết quả bằng công thức abc/(4R)."
  ],
  "formula": "\\frac{a}{\\sin A}=\\frac{b}{\\sin B}=\\frac{c}{\\sin C}=2R // S=\\frac{abc}{4R}.",
  "method": {
   "title": "Tìm R từ hai cạnh và một góc xen giữa",
   "steps": [
    "Dùng định lí côsin để tìm cạnh đối diện góc đã biết.",
    "Đổi sang định lí sin để lấy đường kính.",
    "Chia đôi và kiểm tra đơn vị."
   ],
   "worked": [
    [
     "Tìm R từ hai cạnh và một góc xen giữa",
     "Cho b = 5 cm, c = 7 cm và A = 60°. Tính R.",
     [
      "a²=25+49−2×5×7×1/2=39, nên a=√39.",
      "R = √39/(2 sin 60°) = √39/√3."
     ],
     "√13 cm.",
     "Vế a/sin A là đường kính 2R."
    ]
   ]
  }
 },
 "g10-b25": {
  "title": "Tìm hệ số một số hạng trong nhị thức Newton",
  "facts": [
   "Số hạng ứng với k trong khai triển (a+b)^n chọn k thừa số b và n−k thừa số a.",
   "Cần giữ cả dấu và hệ số của a, b khi nâng lũy thừa.",
   "Muốn tìm hệ số của một lũy thừa của x, lập phương trình về số mũ để tìm k."
  ],
  "formula": "T_k=\\binom{n}{k}a^{n-k}b^k, với 0 ≤ k ≤ n.",
  "method": {
   "title": "Tìm hệ số bằng chỉ số k",
   "steps": [
    "Viết số hạng tổng quát và thu gọn số mũ của x.",
    "Giải điều kiện về số mũ và kiểm tra k nguyên trong phạm vi.",
    "Thay k để tìm hệ số, có xét dấu."
   ],
   "worked": [
    [
     "Tìm hệ số bằng chỉ số k",
     "Tìm hệ số của x³ trong (2x−1)^5.",
     [
      "Chọn a=2x, b=−1. Số mũ x là 5−k nên k=2.",
      "Hệ số là C(5,2)×2³×(−1)²=10×8."
     ],
     "80.",
     "Hệ số là số đi kèm x³. Số hạng đầy đủ là 80x³."
    ]
   ]
  }
 },
 "g11-b2": {
  "title": "Tách cung và chọn công thức lượng giác",
  "facts": [
   "Công thức cộng dùng khi góc viết được thành tổng hoặc hiệu của hai góc có giá trị quen thuộc.",
   "Trong công thức cos của tổng, số hạng chứa tích hai sin mang dấu trừ.",
   "Kiểm tra dấu kết quả theo góc phần tư."
  ],
  "formula": "cos(a+b)=cos a cos b−sin a sin b // sin(a+b)=sin a cos b+cos a sin b.",
  "method": {
   "title": "Tính chính xác giá trị lượng giác của góc ghép",
   "steps": [
    "Tách góc thành tổng hoặc hiệu của hai góc đặc biệt.",
    "Thay các giá trị chuẩn và giữ nguyên căn.",
    "Dùng góc phần tư để kiểm tra dấu."
   ],
   "worked": [
    [
     "Tính chính xác giá trị lượng giác của góc ghép",
     "Tính cos 105° bằng công thức cộng.",
     [
      "105°=60°+45°.",
      "cos 105°=(1/2)(√2/2)−(√3/2)(√2/2).",
      "Hai phân số cùng mẫu 4, gộp tử được √2−√6."
     ],
     "\\frac{√2-√6}{4}.",
     "Góc 105° thuộc phần tư II nên cos phải âm."
    ]
   ]
  }
 },
 "g11-b16": {
  "title": "Khử dạng vô định bằng phân tích và liên hợp",
  "facts": [
   "Dạng 0/0 là tín hiệu cần biến đổi, chưa cho giá trị của giới hạn.",
   "Với đa thức, có thể tách nhân tử x−a rồi rút gọn khi x khác a.",
   "Với hiệu chứa căn, nhân liên hợp để tạo hiệu bình phương. Phải xét biểu thức trên lân cận của điểm tiến tới."
  ],
  "formula": "√U−√V=\\frac{U-V}{√U+√V} khi mẫu bên phải khác 0.",
  "method": {
   "title": "Tính giới hạn bằng liên hợp rồi thế",
   "steps": [
    "Thế trực tiếp để nhận ra dạng 0/0.",
    "Nhân liên hợp, rút gọn nhân tử chung trên lân cận bỏ điểm.",
    "Thế x tiến tới giá trị đề cho vào biểu thức mới."
   ],
   "worked": [
    [
     "Tính giới hạn bằng liên hợp rồi thế",
     "Tính giới hạn của \\frac{√(1+5x)-1}{x} khi x tiến tới 0.",
     [
      "Nhân liên hợp √(1+5x)+1, tử trở thành 5x.",
      "Với x ≠ 0, rút gọn được 5/(√(1+5x)+1).",
      "Mẫu tiến tới 2."
     ],
     "5/2.",
     "Phép rút gọn dùng tại x khác 0. Sau đó mới lấy giới hạn."
    ]
   ]
  }
 },
 "g11-b31": {
  "title": "Đạo hàm tại điểm từ định nghĩa",
  "facts": [
   "Tốc độ thay đổi trung bình trên một khoảng được đo bằng thương của độ biến thiên giá trị hàm và độ biến thiên biến số.",
   "Đạo hàm tại x₀ là giới hạn của thương đó khi độ biến thiên tiến về 0, nếu giới hạn tồn tại.",
   "Đạo hàm là hệ số góc tiếp tuyến tại điểm tương ứng trên đồ thị."
  ],
  "formula": "f′(x₀)=lim khi h → 0 của \\frac{f(x₀+h)-f(x₀)}{h}.",
  "method": {
   "title": "Tính đạo hàm tại một điểm bằng giới hạn",
   "steps": [
    "Viết f(x₀+h) và f(x₀) riêng.",
    "Khai triển hiệu rồi chia h ở các giá trị h khác 0.",
    "Lấy giới hạn khi h tiến tới 0."
   ],
   "worked": [
    [
     "Tính đạo hàm tại một điểm bằng giới hạn",
     "Cho f(x)=x²−3x. Tính f′(2) bằng định nghĩa.",
     [
      "f(2)=−2. f(2+h)=−2+h+h².",
      "Thương sai phân bằng (h+h²)/h=1+h khi h≠0.",
      "Cho h tiến về 0, giới hạn bằng 1."
     ],
     "f′(2)=1.",
     "Không thay h=0 trước khi rút gọn."
    ]
   ]
  }
 },
 "g12-b3": {
  "title": "Phân biệt tiệm cận đứng và điểm gián đoạn có thể khử",
  "facts": [
   "x=a là tiệm cận đứng nếu ít nhất một giới hạn một phía tại a bằng +∞ hoặc −∞.",
   "y=b là tiệm cận ngang nếu hàm có giới hạn hữu hạn b khi x tiến tới +∞ hoặc −∞.",
   "Mẫu bằng 0 chỉ cho một điểm cần xét. Nếu nhân tử triệt tiêu và giới hạn hữu hạn, điểm đó không tạo tiệm cận đứng."
  ],
  "formula": "Nếu lim khi x → a⁺ của f(x) = +∞ thì x=a là tiệm cận đứng.",
  "method": {
   "title": "Tìm tiệm cận của hàm phân thức có nhân tử chung",
   "steps": [
    "Ghi điều kiện xác định ban đầu.",
    "Rút gọn và tính giới hạn tại từng điểm bị loại.",
    "Tính thêm giới hạn ở vô cực để nhận tiệm cận ngang."
   ],
   "worked": [
    [
     "Tìm tiệm cận của hàm phân thức có nhân tử chung",
     "Tìm các tiệm cận của \\frac{x²-1}{(x-1)(x-3)}.",
     [
      "Điều kiện x ≠ 1, 3. Rút gọn được (x+1)/(x−3).",
      "Tại x=1, giới hạn bằng −1 nên không có tiệm cận đứng ở đó. Tại x=3, phân thức có giới hạn vô cực một phía.",
      "Ở vô cực, chia cả tử và mẫu cho x, được giới hạn 1."
     ],
     "x=3 là tiệm cận đứng, y=1 là tiệm cận ngang.",
     "x=1 vẫn nằm ngoài tập xác định dù không phải tiệm cận."
    ]
   ]
  }
 },
 "g12-b16": {
  "title": "Góc giữa đường thẳng và mặt phẳng",
  "facts": [
   "Góc giữa đường thẳng và mặt phẳng nằm từ 0° đến 90°.",
   "Vectơ chỉ phương của đường thẳng và pháp tuyến của mặt phẳng cho góc phụ với góc đang xét sau khi lấy góc nhọn tương ứng.",
   "Dùng trị tuyệt đối của tích vô hướng để kết quả không phụ thuộc hướng chọn vectơ."
  ],
  "formula": "sin φ=\\frac{∣\\vec{u}·\\vec{n}∣}{∣\\vec{u}∣∣\\vec{n}∣}.",
  "method": {
   "title": "Tính góc từ tọa độ vectơ",
   "steps": [
    "Lấy vectơ chỉ phương u của đường và pháp tuyến n của mặt.",
    "Tính tích vô hướng và độ dài hai vectơ.",
    "Dùng sin để tìm góc trong đoạn [0°;90°]."
   ],
   "worked": [
    [
     "Tính góc từ tọa độ vectơ",
     "Đường thẳng có vectơ chỉ phương (1; 1; 0), mặt phẳng có pháp tuyến (1; 0; 1). Tính góc giữa đường và mặt.",
     [
      "Tích vô hướng bằng 1. Mỗi vectơ dài √2.",
      "sin φ = 1/2.",
      "Trong đoạn [0°;90°], giá trị này ứng với 30°."
     ],
     "30°.",
     "Dùng cos cho góc giữa hai vectơ, dùng sin cho góc giữa đường và mặt."
    ]
   ]
  }
 }
};
