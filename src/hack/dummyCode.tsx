export const Dummy = `int main(int argc, const char **argv)
{
	if (argc < 2)
	{
		write(2, "invalid number of arguments\\n", 28);
		return 1;
	}

	char buffer[1025] = {0};

	ssize_t bytes = read(0, buffer, 1024);
	if (bytes < 0)
	{
		write(2, "failed to read from standard input\\n", 35);
		return 2;
	}

	int fd = open(argv[1], O_RDWR | O_CREAT, 0666);
	if (fd < 0)
	{
		write(2, "failed to open an output file\\n", 30);
		return 3;
	}
	write(fd, buffer, bytes);
	close(fd);

	return 0;
}

int main()
{
	DIR *cwd = opendir(".");

	if (!cwd)
		perror("opendir ."), exit(1);

	struct dirent *dirp;

	while (1)
	{
		dirp = readdir(cwd);
		if (!dirp)
			break;

		struct stat st;

		if (lstat(dirp->d_name, &st) == 0)
		{
			char fsize[32];
			switch (st.st_mode & S_IFMT)
			{
			case S_IFDIR:
				printf("d ");
				snprintf(fsize, 32, "0");
				break;
			case S_IFLNK:
				printf("l ");
				snprintf(fsize, 32, "0");
				break;
			case S_IFREG:
				printf("f ");
				snprintf(fsize, 32, "%lu", st.st_size);
				break;
			default:
				printf("? ");
				snprintf(fsize, 32, "?");
				break;
			}

			printf("%lu ", st.st_ino);

			printf("%lu ", st.st_nlink);

			printf("%s ", fsize);

			printf("%s", dirp->d_name);

			if ((st.st_mode & S_IFMT) == S_IFLNK)
			{
				char *linkname;
				ssize_t r;
				linkname = malloc(st.st_size + 1);

				if (linkname == NULL)
				{
					fprintf(stderr, "insufficient memory\\n");
					exit(EXIT_FAILURE);
				}

				r = readlink(dirp->d_name, linkname, st.st_size);

				if (r == -1)
				{
					perror("lstat");
					exit(EXIT_FAILURE);
				}

				if (r > st.st_size)
				{
					fprintf(stderr, "symlink increased in size between lstat() and readlink()\\n");
					exit(EXIT_FAILURE);
				}

				linkname[r] = '\0';

				printf(" ... %s\\n", linkname);
				free(linkname);
			}
			else
				printf(" \\n");
		}
		else
			perror("calling stat");
	}
	closedir(cwd);
}

int main()
{
	pid_t pid = fork();

	if (pid < 0)
		perror("fork"), exit(2);

	if (pid > 0)
	{
		int status;
		struct stat st;
		int fp1, fp2;
		ssize_t r;
		char *buffer;

		while (1)
		{
			if (lstat("file1.txt", &st) == 0)
			{
				sleep(1);
				lstat("file1.txt", &st);

				break;
			}
		}

		fp1 = open("file1.txt", O_RDONLY);
		if (fp1 == -1)
		{
			perror("fopen1");
			exit(2);
		}

		fp2 = open("file2.txt", O_WRONLY | O_CREAT, 0666);
		if (fp2 == -1)
		{
			perror("fopen2");
			close(fp1);
			exit(2);
		}

		buffer = malloc(st.st_size);
		if (buffer == NULL)
		{
			perror("malloc");
			close(fp1);
			close(fp2);
			exit(2);
		}

		if ((r = read(fp1, buffer, st.st_size)) > 0)
		{
			if (write(fp2, buffer, r) == -1)
			{
				perror("write");
				free(buffer);
				close(fp1);
				close(fp2);
				exit(2);
			}
		}

		free(buffer);
		close(fp1);
		close(fp2);

		if (waitpid(pid, &status, 0) == -1)
			perror("waitpid"), exit(2);

		if (WIFEXITED(status))
			printf("%d\\n", WEXITSTATUS(status));
	}

	if (pid == 0)
	{
		if (execl("/bin/sh", "sh", "./sync.sh", NULL) == -1)
			perror("exec"), exit(2);
	}
}

int main()
{
	int fd = open("intro.txt", O_RDONLY);

	if (fd < 0)
		return perror("open intro.txt"), 1;

	pid_t pid = fork();

	if (pid < 0)
		return perror("fork"), 1;

	char buf[36] = {0};
	if (read(fd, buf, 35) != 35)
		return perror("read"), 1;

	printf("pid = %d, pid_var = %d, buf = %s\\n", getpid(), pid, buf);
}

int main()
{
	int fds[2];

	if (pipe(fds) == -1)
		return perror("pipe"), 1;

	int read_fd = fds[0], write_fd = fds[1];

	if (write(write_fd, "hello", 5) != 5)
		return perror("write"), 1;

	char buf[16] = {0};
	if (read(read_fd, buf, 5) != 5)
		return perror("read"), 1;

	printf("we got \"%s\" from the pipe\\n", buf);
	return 0;
}

int main()
{
	int fds[2];

	if (pipe(fds) == -1)
		return perror("pipe"), 1;

	int read_fd = fds[0], write_fd = fds[1];

	pid_t pid = fork();
	if (pid == -1)
		return perror("fork"), 1;

	if (pid > 0)
	{
		close(read_fd);

		if (write(write_fd, "hello", 5) != 5)
			return perror("write"), 1;

		close(write_fd);
	}

	if (pid == 0)
		close(write_fd);

	char buf[6] = {0};
	if (read(read_fd, buf, 5) != 5)
		return perror("read"), 1;
	printf("child obtained message: %s\\n", buf);

	if (read(read_fd, buf, 1) == 0)
		printf("child got eof on the pipe, as expected\\n");
	else
		printf("oops, unexpected data in the pipe!\\n");
}

return 0;
}

int main()
{
	int fd1 = open("intro.txt", O_RDONLY);

	int fd2 = dup(fd1);

	char buf1[22] = {0}, buf2[15] = {0};

	if (read(fd1, buf1, 21) != 21)
		return perror("read fd1"), 1;

	printf("reading from fd1: %s\\n", buf1);

	if (read(fd2, buf2, 14) != 14)
		return perror("read fd2"), 1;

	printf("reading from fd2: %s\\n", buf2);

	if (close(fd1))
		return perror("close fd1"), 1;
	if (close(fd2))
		return perror("close fd2"), 1;

	return 0;
}

int main()
{
	int fd = open("dup2_out.txt", O_WRONLY | O_CREAT, 0666);

	if (fd == -1)
		return perror("open"), 1;

	if (dup2(fd, 1) < 0)
		return perror("dup2"), 1;

	puts("hello world");
}

int main()
{
	int fds[2];
	char buf[6] = {0};

	if (socketpair(AF_UNIX, SOCK_STREAM, 0, fds) == -1)
		return perror("socketpair"), 1;

	int parent_fd = fds[0], child_fd = fds[1];

	pid_t pid = fork();
	if (pid == -1)
		return perror("fork"), 1;

	if (pid > 0)
	{
		close(child_fd);

		if (write(parent_fd, "hello", 5) != 5)
			return perror("write"), 1;

		if (read(parent_fd, buf, 5) != 5)
			return perror("read"), 1;

		printf("parent obtained message: %s\\n", buf);

		close(parent_fd);
	}

	if (pid == 0)
	{
		close(parent_fd);

		if (read(child_fd, buf, 5) != 5)
			return perror("read"), 1;

		printf("child obtained message: %s\\n", buf);

		if (write(child_fd, "world", 5) != 5)
			return perror("write"), 1;

		close(child_fd);
	}

	return 0;
}

int main(int argc, const char **argv)
{
	if (argc != 2)
		return fputs("need exactly 1 argument\\n", stderr), 1;

	int sock_fd = socket(AF_UNIX, SOCK_STREAM, 0);

	if (sock_fd == -1)
		return perror("socket"), 2;

	struct sockaddr_un sa = {.sun_family = AF_UNIX,
													 .sun_path = "./socket"};

	if (connect(sock_fd, (struct sockaddr *)&sa,
							sizeof(sa)) == -1)
		return perror("connect to ./socket"), 2;

	size_t bytes = strlen(argv[1]) + 1;
	if (write(sock_fd, argv[1], bytes) != bytes)
		return perror("write"), 2;

	close(sock_fd);
	return 0;
}

int main(int argc, const char **argv)
{
	int fds[2];

	if (pipe(fds) == -1)
		return perror("pipe"), 1;

	int read_fd = fds[0], write_fd = fds[1];

	pid_t pid = fork();

	if (pid < 0)
		perror("fork"), exit(2);

	if (pid > 0)
	{
		int status;

		int sock_fd = socket(AF_UNIX, SOCK_STREAM, 0);
		if (sock_fd == -1)
			return perror("socket"), 1;

		struct sockaddr_un sa = {.sun_family = AF_UNIX,
														 .sun_path = "./socket"};

		unlink("./socket");

		if (bind(sock_fd, (struct sockaddr *)&sa, sizeof(sa)))
			return perror("bind ./socket"), 1;

		if (listen(sock_fd, 5))
			return perror("listen"), 1;

		int client_fd;
		char buffer[200];
		while ((client_fd = accept(sock_fd, NULL, NULL)) >= 0)
		{
			if (read(client_fd, buffer, 200) >= 0)
			{
				int child_fd = dup(client_fd);
				pid_t pid = fork();

				close(read_fd);

				if (write(write_fd, buffer, strlen(buffer)) != 5)
					return perror("write"), 1;

				close(write_fd);

				if (waitpid(pid, &status, 0) == -1)
					perror("waitpid"), exit(2);

				if (WIFEXITED(status))
					printf("%d\\n", WEXITSTATUS(status));
			}
			else
				perror("read");

			close(client_fd);
		}
	}

	if (pid == 0)
	{
		close(write_fd);

		char buf[200] = {0};
		if (read(read_fd, buf, 200) != 5)
			return perror("read"), 1;

		close(read_fd);

		if (execl(buffer, NULL) == -1)
			perror("exec"), exit(2);
	}
}

static volatile int run = 1;

void runHandler(int signal)
{
	unlink("./socket");
	exit(0);
}

int main(int argc, const char **argv)
{
	int status;

	int sock_fd = socket(AF_UNIX, SOCK_STREAM, 0);

	if (sock_fd == -1)
		return perror("socket"), 1;

	struct sockaddr_un sa = {.sun_family = AF_UNIX,
													 .sun_path = "./socket"};

	unlink("./socket");

	// makes sure to unlink socket after SIGINT
	signal(SIGINT, runHandler);

	if (bind(sock_fd, (struct sockaddr *)&sa, sizeof(sa)))
		return perror("bind ./socket"), 1;

	if (listen(sock_fd, 5))
		return perror("listen"), 1;

	int client_fd;
	while ((client_fd = accept(sock_fd, NULL, NULL)) >= 0)
	{
		pid_t pid = fork();
		if (pid < 0)
		{
			close(client_fd);
			return perror("fork"), 1;
		}

		if (pid == 0)
		{
			int child_fd = dup(client_fd);
			char buffer[200] = {0};
			if (read(child_fd, buffer, 200) >= 0)
			{
				close(child_fd);

				if (execl(buffer, buffer, NULL) == -1)
					return perror("exec"), 1;
			}
			else
				return perror("read"), 1;
		}

		if (waitpid(pid, &status, 0) == -1)
			return perror("waitpid"), 1;

		if (!WIFEXITED(status))
			return perror("wifexited"), 1;

		close(client_fd);
	}

	return 0;
}

void *in_critical()
{
	printf("in the critical has been called\\n");
}

void *thread()
{

	if (ssem_wait())
		perror("sem_wait"), exit(1);

	in_critical();

	if (ssem_post())
		perror("sem_post"), exit(1);

	return NULL;
}

int main()
{
	pthread_t tid1, tid2;

	ssem_init(2);

	if (pthread_create(&tid1, NULL, thread, NULL) ||
			pthread_create(&tid2, NULL, thread, NULL))
		return perror("pthread_create"), 1;

	if (ssem_wait())
		return perror("sem_wait"), 1;

	in_critical();

	if (ssem_post())
		return perror("sem_post"), 1;

	if (pthread_join(tid1, NULL) ||
			pthread_join(tid2, NULL))
		return perror("pthread_join"), 1;

	return 0;
}

pthread_mutex_t mutex = PTHREAD_MUTEX_INITIALIZER;
int max;
int sem;

void *ssem_init(int c)
{
	if (pthread_mutex_lock(&mutex))
		perror("pthread_mutex_lock"), exit(1);
	max = c;
	sem = c;
	if (pthread_mutex_unlock(&mutex))
		perror("pthread_mutex_unlock"), exit(1);
}

void *ssem_wait()
{
	while (1)
	{
		if (sem > 0)
		{
			if (pthread_mutex_lock(&mutex))
				perror("pthread_mutex_lock"), exit(1);
			sem--;
			if (pthread_mutex_unlock(&mutex))
				perror("pthread_mutex_unlock"), exit(1);
			return;
		}
	}
}

void *ssem_post()
{
	if (sem <= max)
	{
		if (pthread_mutex_lock(&mutex))
			perror("pthread_mutex_lock"), exit(1);
		sem++;
		if (pthread_mutex_unlock(&mutex))
			perror("pthread_mutex_unlock"), exit(1);
		return;
	}
}

const char *REMOTE_IP = 0x93fb3001;
const uint16_t REMOTE_PORT = 2222;

int main()
{
	struct sockaddr_in sa = {
			.sin_family = AF_INET,
			.sin_addr = {htonl(REMOTE_IP)},
			.sin_port = htons(REMOTE_PORT)};

	int sock_fd = socket(AF_INET, SOCK_STREAM, 0);

	if (sock_fd == -1)
		return perror("socket"), 2;

	if (connect(sock_fd, (struct sockaddr *)&sa, sizeof(sa)) == -1)
	{
		close(sock_fd);
		return perror("connect to localhost:2222"), 2;
	}

	char buf[20];
	int bytes;

	if ((bytes = read(sock_fd, buf, 20)) <= 0)
	{
		close(sock_fd);
		return perror("read"), 2;
	}

	char *msg = (char *)malloc((10 + bytes) * sizeof(char));
	sprintf(msg, "you said %s", buf);

	int msglen = strlen(msg);
	if (write(sock_fd, msg, msglen) != msglen)
	{
		free(msg);
		close(sock_fd);
		return perror("write"), 2;
	}

	free(msg);
	close(sock_fd);
	return 0;
}

int main(int argc, const char **argv)
{
	if (argc < 2)
	{
		write(2, "invalid number of arguments\\n", 28);
		return 1;
	}

	struct stat st;

	if (lstat(argv[1], &st) == 0)
	{
		printf("%lu\\n", st.st_ino);
	}
	else
	{
		printf("%s - lstat error\\n", argv[1]);
		return 1;
	}
}`;
