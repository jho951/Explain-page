# EC2 Deployment Bundle

이 디렉터리는 EC2에서 앱 레포를 clone하지 않고 배포할 때 사용하는 번들입니다.

## 구성

- `docker-compose.yml`
- `.env`
- `nginx/default.conf`

## 사용 순서

1. 이 디렉터리만 EC2에 업로드합니다.
2. `.env.example`을 `.env`로 복사합니다.
3. `EXPLAIN_PAGE_IMAGE`를 실제 ECR 이미지로 바꿉니다.
4. 필요하면 도메인/포트 값을 수정합니다.
5. 아래를 실행합니다.

```bash
docker compose pull
docker compose up -d
docker compose ps
```

## 전제

- EC2에는 Docker와 `docker compose`가 설치되어 있어야 합니다.
- EC2는 ECR에서 이미지를 pull할 수 있어야 합니다.
- Nginx 컨테이너가 80 포트를 받아 `explain-page` 앱 컨테이너의 3000 포트로 reverse proxy 합니다.
