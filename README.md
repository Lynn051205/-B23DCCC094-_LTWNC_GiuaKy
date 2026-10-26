# Thư viện Mây

Ứng dụng web quản lý thư viện với giao diện pastel, hỗ trợ tra cứu kho sách, mượn/trả sách và theo dõi tình trạng tài liệu. Đây là project bài kiểm tra giữa kỳ LTWNC (RIPT1411-20261-02).

## Tính năng

- **Kho sách (`/`)**: xem danh mục, tìm theo tên sách, tác giả hoặc mã sách; lọc theo thể loại và xem số bản còn.
- **Mượn và trả sách**: mượn sách còn bản, trả sách đang mượn; giới hạn tối đa 3 cuốn trong một phiên.
- **Tổng quan (`/stats`)**: xem tổng đầu sách, tổng số bản, số bản sẵn sàng, đầu sách hết bản, phân bổ theo thể loại và danh sách sách cần theo dõi.
- **Giao diện responsive**: sidebar có thể mở thành drawer trên màn hình nhỏ; hỗ trợ giao diện sáng và tối.
- **Trạng thái tải và lỗi**: API giả lập có thể được đặt ở chế độ lỗi để kiểm tra thông báo và thao tác thử lại.

## Dữ liệu và giới hạn hiện tại

Danh mục sách là dữ liệu demo tiếng Việt được định nghĩa tại `src/data/books.ts` và tải qua API giả lập trong `src/api/booksApi.ts`. Project hiện không kết nối backend hoặc cơ sở dữ liệu thật.

Trạng thái mượn/trả được quản lý bằng Redux trong bộ nhớ, vì vậy sẽ trở về dữ liệu ban đầu khi tải lại trang. Tùy chọn giao diện sáng/tối được lưu riêng trong `localStorage`.

## Chạy dự án

Yêu cầu Node.js 18 trở lên.

```bash
npm install
npm run dev
```

Vite mặc định phục vụ ứng dụng tại `http://localhost:5173`.

Các lệnh phát triển và kiểm tra:

```bash
npm test           # chạy test bằng Jest
npm run lint       # kiểm tra ESLint
npm run typecheck  # kiểm tra TypeScript
npm run build      # kiểm tra TypeScript và tạo production build
npm run preview    # xem production build trên máy local
```

Để kiểm tra trạng thái lỗi của API giả lập, mở `http://localhost:5173/?fail=1`. Dùng nút **Thử lại** để tải dữ liệu trong chế độ bình thường.

## Công nghệ

React 18 · TypeScript · Vite · React Router · Redux Toolkit · Zustand · React Context · CSS Modules · Jest · React Testing Library

## Cấu trúc chính

```text
src/
├── api/booksApi.ts                 API giả lập tải danh sách sách
├── app/                            Cấu hình Redux store, reducer, hooks và giới hạn mượn
├── components/
│   ├── feedback/                   Trạng thái tải và lỗi
│   ├── layout/                     Sidebar, header và layout dùng chung
│   └── ui/                         Thành phần giao diện dùng chung
├── data/books.ts                   Dữ liệu demo của thư viện
├── features/
│   ├── books/                      State sách, selectors, mượn/trả và các component liên quan
│   ├── filters/                    Tìm kiếm, lọc thể loại và Zustand store
│   └── theme/                      Giao diện sáng/tối bằng React Context
├── hooks/useDebounce.ts            Debounce từ khóa tìm kiếm
├── pages/                          Kho sách và Tổng quan
├── styles/                         Theme tokens và màu thể loại
└── types/                          Kiểu dữ liệu sách và API
```

## Kiểm thử

Các test Jest/React Testing Library bao phủ reducer và trạng thái tải sách, giới hạn mượn, thao tác trên thẻ sách, debounce, tìm kiếm/lọc và luồng mượn-trả trên trang Kho sách.
