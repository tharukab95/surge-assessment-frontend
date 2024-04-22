locals {
  #   bucket_name = "surge-tf-demo"
  #   table_name  = "surgeTfDemo"

  ecr_repo_name = "demo-frontend-app-ecr-repo"

  demo_app_cluster_name        = "demo-frontend-app-cluster"
  availability_zones           = ["us-east-1a", "us-east-1b", "us-east-1c"]
  demo_app_task_famliy         = "demo-frontend-app-task"
  container_port               = 4000
  demo_app_task_name           = "demo-frontend-app-task"
  ecs_task_execution_role_name = "demo-frontend-app-task-execution-role"

  application_load_balancer_name = "surge-demo-frontend-app-alb"
  target_group_name              = "surge-demo-frontend-alb-tg"

  demo_app_service_name = "surge-demo-frontend-app-service"
}