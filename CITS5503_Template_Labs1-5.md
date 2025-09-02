<div style="display: flex; flex-direction: column; justify-content: center; align-items: center; height: 100vh;">

  <h2>Labs 1-5</h2>
  
  <p>Student ID: 24064091</p>
  <p>Student Name: Zichen</p>

</div>

# Lab 1

## AWS Account and Log in

### [1] Log into an IAM user account created for you on AWS.

#### [1.1.1] Log into an IAM user account created for me on AWS

**Description:** Following the lab's reference prompts, I clicked on the AWS console's URL https://489389878001.signin.aws.amazon.com/console and entered my user ID, username, and password.

**Result:** Successfully logged into AWS console as IAM user with username 24064091@student.uwa.edu.au

### [2] Search and open Identity Access Management

**Step1-Description:** Once logged in, I clicked on the user-inverted triangle icon at the top right of the current page and found the security credentials there. Security Credentials for AWS are credentials used for authentication and authorisation that allow users and programs to access AWS services and resources securely. The primary role of security credentials is to ensure that only authorized users and applications can access resources on AWS, such as EC2 instances, S3 storage buckets, and so on.

**Step2-Description:** After clicking on the security credentials, the access key page is found, asking to create access key.

**Step3-Description:** After clicking create an access key, perform the steps "access key best practices&alternatives", "set description tag" and "retrieve access key" to complete the access key creation. And we can also see the Secret access key by clicking the blue "show".

## Set up recent Unix-like OSes

**Description:** As needed, I chose Virtual Box as a virtual machine to run the Kali Linux operating system.

## Install Linux packages

### [1] Install Python

**Description:** According to the lab reference, I entered the commands `python3 --version` and `pip3 --version` to see the latest versions of python3 and pip3, which are Python 3.11.9 and pip 24.1.1 respectively; then followed the further prompts to install pip by typing the command:

```bash
sudo apt install python3 python3-pip
```

**Explanation:** pip: python's package management tool for installing and managing Python libraries and tools.


### [2] Install awscli

**Description:** Then, following further prompts, I entered the command:

```bash
sudo apt install awscli
```

to install the AWS CLI (Amazon Web Services Command Line Interface). Then I entered the command:

```bash
pip3 install awscli --upgrade
```

to install or upgrade the AWS CLI (Amazon Web Services Command Line Interface) tool using Python's package manager pip.

**Explanation:** **AWS CLI (Amazon Web Services Command Line Interface):** is a command line tool that allows users to interact with various cloud services provided by Amazon Web Services (AWS) through a command line interface. It simplifies the management and automation of AWS services for developers, system administrators, and cloud engineers.

- **awscli:** specify to install the AWS CLI tool
- **--upgrade:** Indicates that pip will attempt to upgrade to the latest version if the AWS CLI is already installed. If it is not installed, it will do a fresh install


### [3] Configure AWS

**Description:** Upon further prompting, I entered the command:

```bash
aws configure
```

to set and save the credentials and default settings required by the AWS CLI so that the CLI can properly interact with AWS services. Once the entry is complete, the AWS Access Key ID, AWS Secret Access Key, Default region name, and Default output format appear.

**Explanation:**

- **AWS Access Key ID:** this is one of the authentication keys for AWS users. It is used in conjunction with the AWS Secret Access Key so that the CLI can authenticate your identity and authorise access to AWS resources.

- **AWS Secret Access Key:** this is the confidential part of the access key and is paired with the Access Key ID. This key is used to ensure that the source of the request is an authenticated user.

- **Default region name:** the default AWS region want to operate in. A region is the physical location of an AWS data centre, in this case the region "ca-central-1" based on a range of school numbers.

- Default output format:

   specifies the format of AWS CLI command output. Common options are:

  - json: JSON format output (default)
  - text: Plain text format output
  - table: Tabular output


### [4] Install boto3

**Description:** Next I entered the command:

```bash
pip3 install boto3
```

to install boto3 so that I can access and manage AWS services by writing python code.

**Explanation:** **boto3:** is the official Python SDK (Software Development Kit) for interacting with Amazon Web Services (AWS). It allows developers to access and manage AWS services such as S3, EC2, DynamoDB, Lambda, RDS, etc. via Python code. boto3 provides an abstraction of the AWS service APIs, which simplifies programming and supports the automation of many common tasks (e.g., authentication, error retries, etc.).


## Test the installed environment

### [1] Test the AWS environment

**Description:** Following the lab reference prompts, I entered the command:

```bash
aws ec2 describe-regions --output table
```

to list the available regions in AWS and output the results in a tabular format. As can be seen from the results, all the expected available regions appear, indicating that the AWS environment is normal.

**Explanation:**

- **aws:** AWS Command Line Interface (CLI) master command
- **ec2:** subcommand for the AWS EC2 (Elastic Compute Cloud) service. ec2 is AWS' virtual server service
- **describe-regions:** this is an operational command of the AWS EC2 service that describes or lists all available AWS regions
- **--output table:** this is an option to specify the output format. The --output defines the output format of the AWS CLI commands. table format is the formatting of the output into a table style to make the information clearer and neater


### [2] Test the Python environment

**Description:** Next, I enter the command `python3` to enter the python code editing mode and enter the following code to finally output the available regions in dictionary form.

```python
import boto3
ec2 = boto3.client('ec2')
response = ec2.describe_regions()
print(response)
```

**Explanation:**

- **import boto3:** import the Boto3 library, the official Python SDK for AWS that allows programmatic interaction with AWS services. boto3 is the main library for accessing AWS services, through which service clients and resource objects can be created
- **ec2=boto3.client('ec2'):** create an EC2 client object via boto3.client('ec2'). boto3.client method is used to create a client that interacts with a specific AWS service, in this instance ec2. The client object ec2 will be used to invoke various API operations of the AWS EC2 service, such as describing regions, starting instances, stopping instances, etc. client('ec2') indicates that you want to interact with the EC2 service
- **response=ec2.describe_regions():** Use the EC2 client object ec2 to call the describe_regions method. describe_regions is one of the EC2 service's API operations for obtaining information about all of AWS's available regions (regions). The method returns a response dictionary containing information about all the regions, including the name and endpoint of each region
- **print(response):** output the dictionary


### [3] Write a Python script

**Description:** Finally, I proceeded to write the following Python code to fulfill the requirement '2 columns with Endpoint and RegionName':

```python
import boto3
import pandas as pd
ec2 = boto3.client('ec2')
response = ec2.describe_regions()
regions_data = response['Regions']
data = [(region['Endpoint'], region['RegionName']) for region in regions_data]
df = pd.DataFrame(data, columns=['Endpoint', 'RegionName'])
print(df)
```

**Explanation:**

- **pandas:** data manipulation and analysis library
- **regions = response['Regions']**
- **data = [(region['Endpoint'], region['RegionName']) for region in regions]:** extracts the Endpoint and RegionName from each region and formats it into a list of tuples
- **df = pd.DataFrame(data, columns=['Endpoint', 'RegionName']):** converts the list of tuples into a Pandas DataFrame with columns Endpoint and RegionName


<div style="page-break-after: always;"></div>

# Lab 2
## Create an EC2 instance using awscli

### [1] Create a security group
**Description:** At the prompt, I entered the command:

```bash
aws ec2 create-security-group --group-name 24064091-sg --description 'security group for development environment'
```

to create the security group and acquire the GroupId. A security group is a type of virtual firewall in AWS EC2 that controls network traffic into and out of an EC2 instance.

**Explanation:**

- **aws ec2:** specifies the AWS EC2 service, indicating that the next actions are related to the EC2 service
- **create-security-group:** subcommand of create-security-group, indicating that the action to be performed is to create a new security group
- **--group-name 24064091-sg:** the --group-name option is used to specify the name of the security group. 24064091-sg is the actual name of the security group created
- **--description:** used to provide a description for the security group that helps explain the purpose or configuration of this security group

### [2] Authorise inbound traffic for ssh

**Description:** At the prompt, I entered the command:

```bash
aws ec2 authorize-security-group-ingress --group-name 24064091-sg --protocol tcp --port 22 --cidr 0.0.0.0/0
```

is used to access the EC2 instance associated with this security group via the specified protocol and port.

**Explanation:**

- **authorize-security-group-ingress:** this is a subcommand of the authorise security group inbound rule, indicating that you want to allow external networks to access the instance associated with the security group
- **--protocol tcp:** specifies the network protocols allowed by this rule. Here tcp is the Transmission Control Protocol, which is a common network communications protocol typically used for reliable data transmission
- **--port 22:** specify the port number to allow. In this case, 22 is the default port number used by SSH (Secure Shell). With this rule, you allow SSH access to port 22, which is commonly used for remote login and managing servers
- **--cidr 0.0.0.0/0:** the --cidr option is used to specify a range of IP addresses that are allowed to access the port. 0.0.0.0/0 means that access to port 22 is allowed from anywhere, i.e. all IP addresses in the world can access the SSH service on the EC2 instance

### [3] Create a key pair

**Description:** Then at the prompt, I entered the command:

```bash
aws ec2 create-key-pair --key-name 24064091-key --query "KeyMaterial" --output text > 24064091-key.pem
```

Create a new EC2 key pair and save the private key to the file "24064091-key.pem". The EC2 key pair is used to securely connect to the EC2 instance via SSH when starting the instance.

**Explanation:**

- **create-key-pair:** this is the command to create a new EC2 key pair
- **--key-name 24064091-key:** the --key-name option is used to specify the name of the key pair. 24064091-key is the name of the key pair
- **--query 'KeyMaterial':** this option is used to extract the specific content of the key from the output of the command (KeyMaterial is the actual content of the generated private key)
- **--output text > 24064091-key.pem:** this option specifies the output format as plain text (text), which outputs only the content of the key without other formatting information. ">" is the symbol that redirects the output to a file. 24064091-key.pem is the name of the file in which the contents of the key are stored. Typically the PEM file format is used to store SSH private keys

### [4] Create the instance 

**Description:** Then following further prompts, I entered the command:

```bash
aws ec2 run-instances --image-id ami-048ddca51ab3229ab --security-group-ids 24064091-sg --count 1 --instance-type t2.micro --key-name 24064091-key --query 'Instances[0].InstanceId'
```

to start a new EC2 instance and acquire the ID of the instance.

**Explanation:**

- **run-instances:** subcommand to start EC2 instances. This command is used to start one or more EC2 instances based on the specified configuration
- **--image-id:** Specifies the Amazon Machine Image (AMI) ID used to start the EC2 instance: ami-048ddca51ab3229ab. The AMI is a template for the EC2 instance and contains the operating system, applications, and necessary configuration
- **--security-group-ids:** Specifies the security group 24064091-sg to be applied to the instance. the security group controls network traffic into and out of the instance
- **--count 1:** Specifies the number of instances to be started. 1 means that only one instance is started
- **--instance-type t2.micro:** Specifies the type of EC2 instance. t2.micro is a free tier instance type provided by AWS with lower compute power and resources, which is ideal for small applications or test environments
- **--key-name:** Specify the key pair 24064091-key to be used for SSH connection to the instance. This private key (.pem file) will be used to connect to the instance via SSH
- **--query 'Instances[0].InstanceId':** This option is used to filter the command output to extract the ID of the instance. Instances[0].InstanceId means to return the ID of the first instance started

### [5] Add a tag to your Instance

**Description:** Then following further prompts, I enter the command:

```bash
aws ec2 create-tags --resources i-0f6692bfd03a761ec --tags Key=Name,Value=24064091-vm
```

to create or assign tags to the specified EC2 instance. Tags can be displayed in the AWS console as the name of the instance for easy management and organization of resources.

**Explanation:**

- **create-tags:** Command to create tags for EC2 resources (e.g. instances, volumes, snapshots, etc.)
- **--resources:** Specifies the AWS resources to be tagged. In this command, you need to provide the ID of the resource, in this case it is the ID of the EC2 instance you started earlier: i-0f6692bfd03a761ec
- **--tags Key=Name,Value=24064091-vm:** The --tags option is used to specify the tag key-value pairs to be created. Key=Name: the key for the tag is Name. Value=24064091-vm: the value for the tag is 24064091-vm

### [6] Get the public IP address

**Description:** Then following further prompts, I entered the command:

```bash
aws ec2 describe-instances --instance-ids i-0f6692bfd03a761ec --query 'Reservations[0].Instances[0].PublicIpAddress'
```

to query and get the public IP address '3.96.201.222' of the specified EC2 instance.

**Explanation:**

- **describe-instances:** This is a subcommand for describing EC2 instances, which allows you to get detailed information about one or more EC2 instances, such as status, IP address, labels, etc
- **--instance-ids:** The --instance-ids parameter specifies the ID of the instance you want to query: i-0b2c23f2f5d401c03
- **--query 'Reservations[0].Instances[0].PublicIpAddress':** --query The query parameter is used to filter the output. 'Reservations[0].Instances[0].PublicIpAddress' is the path in JSON format to locate the public IP address of the instance. Reservations[0]: get information about the first reserved instance for which results are returned. Instances[0]: get the details of the first instance. PublicIpAddress: extract the public IP address of the instance

### [7] Connect to the instance via ssh



### [8] List the created instance using the AWS console

**Description:** Finally, go to the console and click on 'Instances (running)' in EC2 to see the created instance i-0f6692bfd03a761ec.

## Create an EC2 instance with Python Boto3

#### [2.2.1] Create a security group

**Code:**

```python
def create_security_group(group_name, description, vpc_id):
    # 创建 EC2 客户端
    ec2 = boto3.client('ec2')
    
    try:
        # 创建安全组
        response = ec2.create_security_group(
            GroupName=group_name,
            Description=description,
            VpcId=vpc_id
        )
        
        # 提取安全组 ID
        group_id = response['GroupId']
        print(f"Security Group Created: {group_id}")
        
        return group_id
    except Exception as e:
        print(f"Error creating security group: {e}")

if __name__ == "__main__":
    group_name = "24064091-sg"  # 替换为你的学生编号
    description = "security group for development environment"
    vpc_id = "vpc-0005adec206d1e86a"  # 替换为你的 VPC ID
    create_security_group(group_name, description, vpc_id)
```

**Explanation:** First I create the function create_security_group(group_name, description, vpc_id), call the client method to create the client; then call the create_security_group method to create the security group; next extract the security group and ID, if there is an error it will report the error 'Error creating security group:'; finally in the main function call function create_security_group(group_name, description, vpc_id), and the main function for the 3 parameters in the main function, and assign values to the three parameters in the main function in turn. As shown in the above figure, the final security group ID is generated: sg-05a81894db2bc1c35.

#### [2.2.2] Authorise inbound traffic for SSH

**Code:**

```python
def authorize_security_group_ingress(group_id, protocol, port, cidr_ip):
    ec2 = boto3.client('ec2')
    
    try:
        response = ec2.authorize_security_group_ingress(
            GroupId=group_id,
            IpPermissions=[
                {
                    'IpProtocol': protocol,
                    'FromPort': port,
                    'ToPort': port,
                    'IpRanges': [
                        {
                            'CidrIp': cidr_ip
                        }
                    ]
                }
            ]
        )
        print("Ingress Successfully Set: ", response)
    except Exception as e:
        print(f"Error authorizing security group ingress: {e}")
```

**Explanation:** Next, I created the function authorize_security_group_ingress(group_id, protocol, port, cidr_ip) to set the inbound rules for the AWS EC2 security group, where cidr_ip is the range of IP addresses denoting the IP addresses that are allowed to access the port; and proceeded to call the client method Create the client, and then call the authorize_security_group_ingres method to set the inbound rules for the specified security group, specifying the protocol, inbound and outbound ports, and the IP address range; if an error occurs during the process of setting the inbound rules, the program catches the exception and prints an error message. Common errors include the security group that does not exist, insufficient privileges, or invalid parameters. As shown in the following figure, the inbound rule is successfully created.

#### [2.2.3] Create a key pair

**Code:**

```python
def create_key_pair(key_name, file_path):
    ec2 = boto3.client('ec2')
    
    try:
        # 创建密钥对
        response = ec2.create_key_pair(KeyName=key_name)
        
        # 提取密钥材料
        key_material = response['KeyMaterial']
        
        # 将密钥材料保存到 PEM 文件中
        with open(file_path, 'w') as file:
            file.write(key_material)
        
        print(f"Key pair '{key_name}' created and saved to '{file_path}'")
    except Exception as e:
        print(f"Error creating key pair: {e}")

if __name__ == "__main__":
    key_name = "24064091-key"  # 替换为学生编号
    file_path = f"24064091-key.pem"  # 替换为希望保存密钥的文件名
    create_key_pair(key_name, file_path)
```

**Explanation:** Next, I created the function create_key_pair(key_name, file_path) for creating AWS EC2 key pairs and saving the keys as PEM files. where file_path means the file path of the created key pair; continue to call the client method to create the client, then call the create_key_pair method to create the key pair, call the response method to extract the key material; call the with open() method to write the extracted private key_material into the file_path and save it in PEM format. If any error occurs during the creation of the key pair (e.g., duplicate name, permission problem, etc.), the program will catch the exception and print the error message to help with debugging and problem-solving. As shown in the above figure, the key pair is successfully created and the material is saved to the PEM file.

#### [2.2.4] Create the instance

**Code:**

```python
def run_instance(image_id, security_group_id, key_name):
    ec2 = boto3.client('ec2')
    try:
        # 启动实例
        response = ec2.run_instances(
            ImageId=image_id,
            SecurityGroupIds=[security_group_id],
            InstanceType='t2.micro',
            KeyName=key_name,
            MinCount=1,
            MaxCount=1
        )
        
        # 提取实例 ID
        instance_id = response['Instances'][0]['InstanceId']
        print(f"Instance launched with ID: {instance_id}")
        return instance_id
    except Exception as e:
        print(f"Error launching instance: {e}")

if __name__ == "__main__":
    image_id = "ami-048ddca51ab3229ab"  # 替换 AMI ID
    security_group_id = "24064091-sg"  # 替换安全组 ID
    key_name = "24064091-key"  # 替换密钥对名称
    run_instance(image_id, security_group_id, key_name)
```

**Explanation:** Then I created the function run_instance(image_id, security_group_id, key_name) to start the instance and generate the instance ID, where image_id means the AMI ID; continue to call the client method to create the client, then call the run_instances method to start the instance Then call run_instances to start the instance, and call response to extract the instance ID; if any error occurs during the process of starting the instance, the program will catch the exception and print the error message to help debugging and problem-solving. As shown in the above figure, the instance is successfully started, and the instance ID：i-031769c98ffd19f82 is generated.

#### [2.2.5] Add a tag to my Instance

**Code:**

```python
def create_tags(instance_id, key, value):
    ec2 = boto3.client('ec2')
    try:
        # 创建标签
        response = ec2.create_tags(
            Resources=[instance_id],
            Tags=[
                {
                    'Key': key,
                    'Value': value
                }
            ]
        )
        print(f"Tags created for instance {instance_id}: Key={key}, Value={value}")
    except Exception as e:
        print(f"Error creating tags: {e}")

if __name__ == "__main__":
    instance_id = "i-031769c98ffd19f82"  # 替换实例 ID
    key = "Name"
    value = "24064091-vm"  # 替换学生编号-vm
    create_tags(instance_id, key, value)
```

**Explanation:** Then I created the function create_tags(instance_id, key, value) to create tags. Continue calling the client method to create the client followed by the create_tags method to create the tags with the key and value. If any error occurs during the process of starting the instance, the program catches the exception and prints the error message to help debugging and problem-solving. As shown above, the tags are successfully created.

#### [2.2.6] Get the public IP address

**Code:**

```python
def get_instance_public_ip(instance_id):
    ec2 = boto3.client('ec2')
    try:
        # 获取实例信息
        response = ec2.describe_instances(
            InstanceIds=[instance_id]
        )
        
        # 提取公共 IP 地址
        public_ip = response['Reservations'][0]['Instances'][0].get('PublicIpAddress', 'No public IP')
        print(f"Instance {instance_id} Public IP Address: {public_ip}")
        return public_ip
    except Exception as e:
        print(f"Error retrieving public IP address: {e}")

if __name__ == "__main__":
    instance_id = "i-031769c98ffd19f82"  # 替换实例 ID
    get_instance_public_ip(instance_id)
```

**Explanation:** Then I created the function get_instance_public_ip(instance_id) to get the public address of the instance. Continuing to call the client method to create the client, followed by a call to describe_instances to get the instance ID, followed by response"['Reservations']""[0]""['Instances']"[0].get('PublicIpAddress', 'No public IP') Get the public IP, response"['Reservations']""[0]""['Instances']"[0] is a list containing all instances under this reservation. The [0] means take out the details of the first instance. .get() is a method of the Python dictionary that gets the value of the specified key.

PublicIpAddress is the public IP address field for the instance. If the instance has a public IP address assigned, it returns the corresponding IP. If no public IP address is assigned, it returns the default value 'No public IP'. If any error occurs during the process of obtaining the public network address, the program catches the exception and prints an error message to help debugging and problem-solving. As shown in the above figure, the public IP was successfully obtained: 3.98.95.40.

##  Install Docker

#### [1] Install Docker

**Description:** Following the prompts, I installed docker by typing the command:

```bash
sudo apt install docker.io -y
```

**Explanation:** **-y:** is an option that indicates an automatic 'yes' answer during the installation process. Often, when installing software, you may be prompted to confirm the installation; using the -y option will skip these prompts and confirm automatically.

#### [2] Check the version

## Build and run an httpd container

##### [2.4.3.1] Create a directory called html

**Description:** According to the requirements of the experiment, I input the following commands:

- `mkdir html`
- `cd html`
- `nano index.html`
- `cat index.html`

to create html folder, create the index.html file under html folder, edit index.html and display the added content.

##### [2.4.3.2] Create a file called Dockerfile and edit

**Description:** Next, I return to the root directory and enter the command `nano Dockerfile` to create a Dockerfile file outside of the html folder, edit the specified contents, and then enter the command `cat Dockerfile` to display the edited content.

##### [2.4.3.3] Build a docker image

**Description:** At the prompt, I enter the command:

```bash
docker build -t my-apache2 .
```

to create the Docker image. -t is shorthand for tag, which means tagging a newly built image.

##### [2.4.3.4] Run the image and open the browser

**Description:** Then, I enter the command:

```bash
docker run -p 80:80 -dit --name my-app my-apache2
```

to run the container my-app based on the my-apache2 image. Open the http://localhost/, and can see the content "Hello World!"

**Explanation:**

- **-d** stands for 'detached' mode, indicating that the container will run in background mode without occupying the current terminal
- **-i** stands for 'interactive', keeping standard input (stdin) open even if the container is running in the background. This is useful in some interactive applications, but may not be obvious in this example
- **-t** stands for 'tty' (pseudo-terminal) and assigns a pseudo-terminal to the container, which is useful for interactive sessions. -i and -t are often used together to maintain interactivity

#### [2.4.4] Stop and remove the container

**Description:** Finally, I enter the commands:

```bash
docker stop my-app
docker rm my-app
```

to stop and remove the container.

<div style="page-break-after: always;"></div>

# Lab 3

## Program

### [1] Preparation

**Description:** At the prompt, I enter the following command `mkdir rootdir` to create the folder rootdir, followed by the commands `cd rootdir`, `touch rootfile.txt` and `echo '1\n2\n3\n4\n5\n'>rootfile.txt` to create the file rootfile.txt in rootdir and write the content 1\n2\n3\n4\n5\n; then, I proceed to create the folder subdir by typing the command `mkdir subdir` in rootdir, followed by typing the command `touch subfile.txt` in subdir and `cp ~/rootdir/rootfile.txt subfile.txt` to create the file subfile.txt and write the same content as rootfile.txt.

### [2] Save to S3 by updating `cloudstorage.py`

##### [2.1] Create Bucket

**Code:**

```python
import boto3
from botocore.exceptions import ClientError
import os

ROOT_DIR = '.'
ROOT_S3_DIR = '24064091-cloudstorage'

s3 = boto3.client('s3')
bucket_config = {'LocationConstraint': 'ca-central-1'}
bucket_name = "24064091-cloudstorage"

def upload_file(s3_bucket, s3_key, file_path):
    print(f"Uploading {file_path} to s3://{s3_bucket}/{s3_key}")

# Main program
# Insert code to create bucket if not there
try:
    # Check if the bucket exists
    s3.head_bucket(Bucket=bucket_name)
    print(f"Bucket {bucket_name} already exists.")
except ClientError:
    try:
        # Create the bucket if it does not exist
        s3.create_bucket(Bucket=bucket_name, CreateBucketConfiguration=bucket_config)
        print(f"Bucket {bucket_name} created.")
    except Exception as e:
        print(f"Error creating bucket: {e}")
```

**Description:** According to the prompt, I enter `python3` command to enter the python writing interface, and then write the function upload_file(s3_bucket, s3_key, file_path) to indicate the success of the file upload, which assigns the values of the three parameters in turn as shown in the figure above. Next, I handle possible exceptions with a try statement that calls S3's head_bucket method, which is used to check whether the specified S3 bucket exists. If the bucket exists and the user has the appropriate permissions, the head_bucket method executes successfully, otherwise a ClientError exception is thrown. If the head_bucket method throws a ClientError, it means that the bucket may not exist, then the create_bucket method is called to create a new S3 bucket, and if the bucket is successfully created, a message is printed indicating that the bucket has been created. If another exception occurs during the bucket creation process (e.g., a network problem, a permissions problem, etc.), this line of code catches all types of exceptions and prints the error that occurred.

##### [2.2] Upload Files

**Code:**

```python
for dir_name, subdir_list, file_list in os.walk(ROOT_DIR, topdown=True):
    rel_path = os.path.relpath(dir_name, ROOT_DIR)
    
    for fname in file_list:
        local_file_path = os.path.join(dir_name, fname)
        
        if rel_path == ".":
            s3_key = fname
        else:
            s3_key = os.path.join(rel_path, fname)
        
        upload_file(ROOT_S3_DIR, s3_key, local_file_path)

print("done")
```

**Description:** Then, based on the hints, I use os.walk(ROOT_DIR, topdown=True) in a for loop to traverse a specified directory structure, rootdir, and upload the files therein to S3; where topdown=True means recursive traversal from the top, i.e., the current directory is processed first, and then its subdirectories are processed. Then use os.path.relpath(dir_name, ROOT_DIR) method to calculate the relative path of the current directory dir_name to the root directory ROOT_DIR. Then I use os.path.join() to splice the current directory path dir_name with the filename fname to generate the full local path of the current file, local_file_path. Next, I judge the path of the file, if the relative path rel_path is '.', it means the file is in the root directory. If the current relative path rel_path is '.', indicating that the file is in the root directory, then s3_key (the path of the file uploaded to S3) is set to the filename fname; Otherwise, s3_key is the result of concatenating the relative path rel_path with the filename fname, ensuring that the file has the correct directory structure in S3. Finally, the upload_file function is called to upload the local file to S3, and the result is shown in the following figure.

### [3] Restore from S3

**Code:**

```python
import boto3
import os

# AWS S3 配置
BUCKET_NAME = '24064091-cloudstorage'
LOCAL_DIR = 'restored_from_S3'

def download_from_s3(bucket_name, local_dir):
    s3 = boto3.client('s3')
    paginator = s3.get_paginator('list_objects_v2')
    for result in paginator.paginate(Bucket=bucket_name):
        if result.get('Contents'):
            for obj in result.get('Contents'):
                key = obj.get('Key')
                local_file_path = os.path.join(local_dir, key)
                
                # 确保本地目录存在
                os.makedirs(os.path.dirname(local_file_path), exist_ok=True)
                
                # 下载文件
                s3.download_file(bucket_name, key, local_file_path)
                print(f'Downloaded {key} to {local_file_path}')

if __name__ == "__main__":
    download_from_s3(BUCKET_NAME, LOCAL_DIR)
```

**Description:** Finally, I followed the prompts and wrote the function download_from_s3(bucket_name, local_dir) to download a file from the specified S3 bucket bucket_name to the local directory local_dir. next, I called the client method to create an S3 client s3. Next, I used the get_paginator('list_objects_v2') is used to paginate the objects in the bucket. list_objects_v2 is the operation that lists the objects in the bucket, and the paginator will process the pagination results. Then use paginator.paginate() method to paginate the objects in the specified bucket, checking if the current pagination result contains objects. contents is the list of objects returned, if no objects are returned, this item will not exist. If Contents exists, use a for loop to iterate through each object obj. Get the object's Key, which is the path (or filename) of the file in the S3 bucket. key is like the path or name of the file in S3. Use os.path.join(local_dir, key) to combine the key with the local directory, local_dir, to generate the local storage path for the file, local_file_path. This ensures that the file is downloaded to the appropriate path locally, maintaining the same file structure as in S3. After that, os.makedirs() is used to make sure the local folder exists. os.path.dirname(local_file_path) gets the folder portion of the file path, and exists_ok=True ensures that no errors are reported if the folder already exists. Finally, the download_file() method is called to download the file from the S3 storage bucket locally.


### [4] Write information about files to DynamoDB

#### [3.1.4.1] Create directory and install jre

**Description:** Following the prompts, I created the folder dynamodb, then I entered the commands:

```bash
sudo apt-get install default-jre
wget https://s3-ap-northeast-1.amazonaws.com/dynamodb-local-tokyo/dynamodb_local_latest.tar.gz
```

to install the Java Runtime Environment and download the zip file for the local version of AWS DynamoDB.

**Explanation:**

- **apt-get:** This is the package manager on Debian and Ubuntu systems for installing, updating and uninstalling packages
- **default-jre:** This is the default Java Runtime Environment (JRE) package, usually the currently recommended version of the JRE, which is required to run Java applications
- **wget:** This is a command-line tool for downloading files from a specified URL

#### [3.1.4.2] Extract files

**Description:** Next, at the prompt, I unzipped the package by typing the command:

```bash
tar -zxvf dynamodb_local_latest.tar.gz
```

**Explanation:**

- **tar:** This is the command used on Linux/Unix systems to archive and decompress files
- **-z:** Indicates that you want to work with compressed files in .gz format and use gzip to decompress them
- **-x:** indicates that you want to extract the archive file
- **-v:** Indicates that detailed information will be output during the decompression process, showing which files were decompressed
- **-f:** Specifies the file to be manipulated. f is immediately followed by the filename, in this case dynamodb_local_latest.tar.gz

#### [3.1.4.3] Run the command

**Description:** Next, I enter the command:

```bash
java -Djava.library.path=./DynamoDBLocal_lib -jar DynamoDBLocal.jar -sharedDb
```

to start a local instance of AWS DynamoDB, which allows you to run DynamoDB in your local environment without connecting to the AWS cloud.

**Explanation:**

- **java:** This is the command used to run Java applications
- **-Djava.library.path=./DynamoDBLocal_lib:** This sets a system property for the JVM (Java Virtual Machine). -Djava.library.path is used to specify the path to the dynamic link library
- **-jar DynamoDBLocal.jar:** -jar means to run a JAR file (Java archive file). DynamoDBLocal.jar is the Java program (JAR file) for the DynamoDB local service. This file is the core of the DynamoDB local instance and is responsible for emulating the functionality of DynamoDB
- **-sharedDb:** Indicates the use of a shared database schema (shared DB). When developing locally, all operations are performed in a shared database file. Without specifying -sharedDb, DynamoDB Local creates separate database files for each user depending on access credentials. If -sharedDb is specified, the same database is used for all requests

#### [3.1.4.4] Create table

**Code:**

```python
import boto3

dynamodb = boto3.resource('dynamodb')

def create_table():
    try:
        # 创建表
        table = dynamodb.create_table(
            TableName='CloudFiles',
            KeySchema=[
                {
                    'AttributeName': 'userId',
                    'KeyType': 'HASH'  # 分区键
                },
                {
                    'AttributeName': 'fileName',
                    'KeyType': 'RANGE'  # 排序键
                },
            ],
            AttributeDefinitions=[
                {
                    'AttributeName': 'userId',
                    'AttributeType': 'S'  # 字符串类型
                },
                {
                    'AttributeName': 'fileName',
                    'AttributeType': 'S'  # 字符串类型
                },
            ],
            ProvisionedThroughput={
                'ReadCapacityUnits': 5,
                'WriteCapacityUnits': 5
            }
        )
        table.wait_until_exists()  # 等待表创建完成
        print(f"成功创建表: {table.table_name}!")
    except Exception as e:
        print(f"创建表时发生错误: {e}")

if __name__ == "__main__":
    create_table()
```

**Description:** Following the prompts, I used boto3.resource('dynamodb') to connect to DynamoDB. and then defined a function create_table() to create the DynamoDB table. The create_table method is then called to create a new DynamoDB table. KeySchema is used to define the primary key schema for DynamoDB. 'userId': This is the partition key (HASH key) in the primary key that identifies the location of the storage slice. 'fileName': this is the sort key (RANGE key) which is used to sort and find data within the partition. AttributeDefinitions: defines the type of attributes for the primary key in the table. 'userId' and "fileName" both have an attribute type of "S", indicating that their values are of string type. wait_until_exists() indicates that it blocks execution until the table creation is complete, ensuring that the table creation operation completes successfully before continuing. The result after creation is shown in the following figure.

#### [3.1.4.5] Get and write attributes

**Code:**

```python
import boto3
import os
from datetime import import datetime

# S3 配置
BUCKET_NAME = '24064091-cloudstorage'

TABLE_NAME = 'CloudFiles'

def get_s3_file_properties(s3_client, bucket_name):
    paginator = s3_client.get_paginator('list_objects_v2')
    files = []
    for result in paginator.paginate(Bucket=bucket_name):
        if result.get('Contents'):
            for obj in result.get('Contents'):
                file_key = obj.get('Key')
                file_properties = {
                    'userId': '24064091',
                    'fileName': os.path.basename(file_key),
                    'path': file_key,
                    'lastUpdated': obj.get('LastModified').isoformat(),
                    'owner': '2a5fac7aada1ad2caa48c9ab08cc4e24248d4eb596108daa3b59f1204ae96482e',
                    'permissions': 'read-write'
                }
                files.append(file_properties)
    return files

def write_to_dynamodb(dynamodb_client, items):
    for item in items:
        dynamodb_client.put_item(
            TableName=TABLE_NAME,
            Item={
                'userId': {'S': item['userId']},
                'fileName': {'S': item['fileName']},
                'path': {'S': item['path']},
                'lastUpdated': {'S': item['lastUpdated']},
                'owner': {'S': item['owner']},
                'permissions': {'S': item['permissions']}
            }
        )
        print(f"Uploaded {item['fileName']} to DynamoDB.")

if __name__ == "__main__":
    s3_client = boto3.client('s3')
    dynamodb_client = boto3.client('dynamodb')
    files = get_s3_file_properties(s3_client, BUCKET_NAME)
    write_to_dynamodb(dynamodb_client, files)
```

**Description:** Next, following the prompt, I defined a function get_s3_file_properties(s3_client, bucket_name) to get the properties of the file from the S3 bucket. Where s3_client.get_paginator('list_objects_v2') is a pager for the S3 client to get the list of objects, the pager will fetch this file information in batches. Iterate through the S3 objects via a for loop to get a list of all the files in the bucket via paging. Use result.get('Contents') to represent the result of each paging, Contents contain detailed information about the files in the batch. file_key = obj.get('Key') represents the full path to the file in S3. file_properties represents a dictionary containing properties. Use the append method to append each file's property dictionary, file_properties, to the files list.

Then I define a function write_to_dynamodb(dynamodb_client, items) to write these properties to DynamoDB's CloudFiles table. Use a for loop to iterate through the list of file attributes obtained from S3, items, with each item representing a file. Use the dynamodb_client.put_item() method to write the file attributes to the DynamoDB table. Each file is a record. Finally, print the confirmation message for each file uploaded to DynamoDB. The successful result is shown below.

### Apple Silicon MacOS Users

### [5] Scan the table

**Description:** At the prompt, I enter the command:

```bash
aws dynamodb scan --table-name CloudFiles --region ca-central-1 --output json
```

to scan the created DynamoDB table and output the information I get.

**Explanation:**

- **aws dynamodb scan:** This is the AWS CLI's dynamodb command. The scan operation is used to scan the entire table for all items. It returns all the data for each item in the table
- **--table-name CloudFiles:** Specifies the name of the DynamoDB table to be scanned, i.e. CloudFiles
- **--region ca-central-1:** Specifies that the AWS region is ca-central-1, meaning that the operation will take place in a DynamoDB service within that region
- **--output json:** Specifies that the output format is JSON so that the results are displayed in a structured JSON format

### [6] Delete the table

**Description:** Finally, at the prompt, I enter the command:

```bash
aws dynamodb delete-table --table-name CloudFiles --region ca-central-1
```

to delete the created DynamoDB table.

**Explanation:** **aws dynamodb delete-table:** This is the AWS CLI's dynamodb command, and the delete-table operation is used to delete the specified DynamoDB table.

<div style="page-break-after: always;"></div>

# Lab 4

## Apply a policy to restrict permissions on the bucket

### [1] Write a Python script

**Code:**

```python
import boto3
import json

# 创建一个S3客户端
s3 = boto3.client('s3')

# 定义S3储存桶名称和用户名
bucket_name = "24064091-cloudstorage"
username = "24064091@student.uwa.edu.au"

# 创建策略文档
bucket_policy = {
    "Version": "2012-10-17",
    "Statement": [
        {
            "Sid": "AllowAllS3ActionsInUserFolderForUserOnly",
            "Effect": "DENY",
            "Principal": "*",
            "Action": "s3:*",
            "Resource": "arn:aws:s3:::24064091-cloudstorage/folder1/folder2/*",
            "Condition": {
                "StringNotLike": {
                    "aws:username": "24064091@student.uwa.edu.au"
                }
            }
        }
    ]
}
```

**Description:** Following the prompts, I defined the S3 storage bucket name, username, and policy, where the policy includes the version date and statement. The statement includes a unique identifier (only allowing specific users to access their folder), and the policy effect (Deny means to deny an action. Meaning, the effect of the policy is to deny certain actions, not allow them). , the policy applies to all AWS users and accounts. 'Action": "s3:" defines the S3 actions that are denied. s3: means that all actions on the S3 service (e.g., uploading, downloading, deleting files, etc.) will be denied. 'Resource": "arn:aws:s3:::24064091-cloudstorage/folder1/folder2/*" defines the resource on which this policy acts. The ARN (Amazon Resource Name) of the resource here points to the folder1/folder2 folder and all its sub-files under the S3 storage bucket 24064091-cloudstorage (/* means recursively match all files). 'Condition 'Conditional statements are used to further restrict the scope of the policy. 'StringNotLike': {'aws": "24064091@student.uwa.edu.au"}: In the condition, only users with 24064091@student.uwa.edu.au will not be rejected, everyone else will be rejected.


### [2] Check whether the script works

##### [4.1.2.1] Use AWS CLI command and AWS S3 console

**Description:** At the prompt, I entered the command:

```bash
aws s3api get-bucket-policy --bucket 24064091-cloudstorage --query Policy --output text
```

to display the policy. And logging into the console also shows the policy.

**Explanation:**

- **aws s3api get-bucket-policy:** Invokes the S3 API via aws to get the policy (Bucket Policy) for a specified bucket. get-bucket-policy returns the policy document associated with the specified S3 bucket, which defines the access rights to the bucket
- **--bucket 24064091-cloudstorage:** The --bucket parameter specifies the name of the S3 storage bucket for which the policy is to be obtained. In this example, the bucket is named 24064091-cloudstorage
- **--query Policy:** The --query parameter is used to specify the filtering or selection of the output. Here, it extracts the contents of the Policy field from the returned JSON response
- **--output text:** The --output parameter is used to specify the output format. text means that the output will be displayed in plain text format instead of the default JSON or other format

##### [4.1.2.2] Test Policy

**Description:** Following the prompts, I used another user 24176913@student.uwa.edu.au to access the rootdir directory in 24064091-cloudstorage and found no access to it.


## AES Encryption using KMS

### [1] Create a KMS key

**Code:**

```python
import boto3

# 创建一个KMS客户端
kms_client = boto3.client('kms')

# 学生编号
student_id = '24064091'

# 创建KMS密钥
response = kms_client.create_key(
    Description='KMS key created for student',
    KeyUsage='ENCRYPT_DECRYPT',
    Origin='AWS_KMS'
)

# 获取密钥的KeyId
key_id = response['KeyMetadata']['KeyId']

# 创建别名
alias_name = f'alias/{student_id}'

kms_client.create_alias(
    AliasName=alias_name,
    TargetKeyId=key_id
)
```

**Description:** Following the prompts, I first created a KMS client using the client method, followed by defining the student number, after which I used the create_key method to create a KMS key, including a description, purpose (for encryption and decryption), and source (to indicate that the key was created and managed by AWS KMS). Next, the response method is used to obtain the KeyId. finally, an alias is defined for the key and created utilizing the create_alias method. the alias helps refer to the key more conveniently without using the complex KeyId each time. a human-readable alias will be associated with the KeyId by this call.

### [2] Attach a policy to the created KMS key

**Code:**

```python
import boto3
import json

# 创建KMS客户端
kms_client = boto3.client('kms')

# 定义你的密钥ID
key_id = '6753d8a9-f9de-4515-bf7b-e34a7ad96d01'

# 定义要附加的策略
policy = {
    "Version": "2012-10-17",
    "Id": "key-consolepolicy-3",
    "Statement": [
        {
            "Sid": "Enable IAM User Permissions",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::489389878001:root"
            },
            "Action": "kms:*",
            "Resource": "*"
        },
        {
            "Sid": "Allow access for Key Administrators",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::489389878001:user/24064091@student.uwa.edu.au"
            },
            "Action": [
                "kms:Create*",
                "kms:Describe*",
                "kms:Enable*",
                "kms:List*",
                "kms:Put*",
                "kms:Update*",
                "kms:Revoke*",
                "kms:Disable*",
                "kms:Get*",
                "kms:Delete*",
                "kms:TagResource",
                "kms:UntagResource",
                "kms:ScheduleKeyDeletion",
                "kms:CancelKeyDeletion"
            ],
            "Resource": "*"
        },
        {
            "Sid": "Allow use of the key",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::489389878001:user/24064091@student.uwa.edu.au"
            },
            "Action": [
                "kms:Encrypt",
                "kms:Decrypt",
                "kms:ReEncrypt*",
                "kms:GenerateDataKey*",
                "kms:DescribeKey"
            ],
            "Resource": "*"
        },
        {
            "Sid": "Allow attachment of persistent resources",
            "Effect": "Allow",
            "Principal": {
                "AWS": "arn:aws:iam::489389878001:user/24064091@student.uwa.edu.au"
            },
            "Action": [
                "kms:CreateGrant",
                "kms:ListGrants",
                "kms:RevokeGrant"
            ],
            "Resource": "*",
            "Condition": {
                "Bool": {
                    "kms:GrantIsForAWSResource": "true"
                }
            }
        }
    ]
}

# 将策略转换为JSON格式并附加到KMS密钥
policy_json = json.dumps(policy)
kms_client.put_key_policy(
    KeyId=key_id,
    PolicyName='default',
    Policy=policy_json
)
```

**Description:** Following the prompts, I first create a KMS client using the client method, then define the KeyId, and then define the policy to be attached, including version, ID, and statement. The statements include: the first statement allows the root user to have full control over the KMS key. The second statement grants the user administrative privileges over the KMS key. The third statement grants the user permission to use the KMS key (encrypt, decrypt, generate data keys, etc.). The fourth statement grants the user permission to perform operations on key-granting AWS resources (such as creating and revoking key grants). Next, use the dumps method to convert the policy to JSON format and add it to the KMS key.

### [3] Check whether the script works
##### [4.2.3.1] Test Administrator Permission

**Description:** According to the prompt, first test the administrator rights, respectively, whether the administrator can modify and save the key and disable the key. After testing, these two can be done, the verification results are shown in the figure below.

##### [4.2.3.2] Test User Permission

**Description:** Following the prompts, the user permissions are then tested to see if the user can encrypt uploaded files and decrypt downloaded files (the same encrypted file), respectively. The specific operation is as follows: when you set the encryption option as shown in the figure below when uploading a file to the specified S3 bucket 24064091-cloudstorage, the specified KMS key will be used. After successfully encrypting the file, you can download the encrypted file you just uploaded from the bucket to the local area, and then open it to automatically decrypt and display the contents.

### [4] Use the created KMS key for encryption/decryption

##### [4.2.4.1] Define encryption&decryption functions

**Code:**

```python
import base64
import os
from botocore.exceptions import NoCredentialsError, PartialCredentialsError

# AWS S3和KMS客户端
s3_client = boto3.client('s3')
kms_client = boto3.client('kms')

# 定义储存桶名称和KMS密钥ID
bucket_name = "24064091-cloudstorage"
kms_key_id = "6753d8a9-f9de-4515-bf7b-e34a7ad96d01"

def encrypt_file(file_content):
    """使用KMS加密文件内容"""
    response = kms_client.encrypt(
        KeyId=kms_key_id,
        Plaintext=file_content
    )
    return response['CiphertextBlob']

def decrypt_file(ciphertext_blob):
    """使用KMS解密文件内容"""
    response = kms_client.decrypt(
        CiphertextBlob=ciphertext_blob
    )
    return response['Plaintext']
```

**Description:** According to the prompt, first use the client method to create the KMS and S3 clients, then define the bucket name and KeyID. Then define the encrypt_file function use the encrypt method to encrypt the content with the KMS key, and return the encrypted content generated by the response method. Then, define the decrypt_file function and use the decrypt method to decrypt the content and return the decrypted content generated by the response method.

##### [4.2.4.2] Process files

**Code:**

```python
def process_files():
    """遍历S3储存桶中的文件，进行加密和解密操作"""
    try:
        # 列出储存桶中的所有对象
        response = s3_client.list_objects_v2(Bucket=bucket_name)
        if 'Contents' in response:
            for obj in response['Contents']:
                file_key = obj['Key']
                print(f"Processing file: {file_key}")
                
                # 下载文件内容
                file_obj = s3_client.get_object(Bucket=bucket_name, Key=file_key)
                file_content = file_obj['Body'].read()
                
                # 加密文件内容
                encrypted_content = encrypt_file(file_content)
                s3_client.put_object(Bucket=bucket_name, Key=f"{file_key}.encrypted", Body=encrypted_content)
                print(f"Encrypted file saved as: {encrypted_key}")
                
                # 解密文件内容
                decrypted_content = decrypt_file(encrypted_content)
                s3_client.put_object(Bucket=bucket_name, Key=f"{file_key}.decrypted", Body=decrypted_content)
                print(f"Decrypted file saved as: {decrypted_key}")
    
    except (NoCredentialsError, PartialCredentialsError):
        print("Error: AWS credentials are not configured correctly.")
    except Exception as e:
        print(f"An error occurred: {e}")
```

**Description:** Next, I defined the function process_files() to traverse the files in the S3 storage bucket using a try statement and a for loop, call the get_object method to download the files, and call the encrypt_file function and the decrypt_file function to perform encryption and decryption operations. The encrypted and decrypted files are named {file_key}.encrypted and {file_key}.decrypted respectively. If an exception occurs, an exception is thrown.


### [5] Apply `pycryptodome` for encryption/decryption

##### [4.2.5.1] Set Key

**Code:**

```python
import os, random, struct
from Crypto.Cipher import AES
from Crypto import Random
import boto3
from botocore.exceptions import NoCredentialsError, PartialCredentialsError

s3_client = boto3.client('s3')
bucket_name = "24064091-cloudstorage"

BLOCK_SIZE = 16
CHUNK_SIZE = 64 * 1024
KEY = b'your32-byte-fixed-length-key-here'  # 32 字节的固定密钥，用于 AES 256 位加密
```

**Description:** Following the prompts, I first created the S3 client and defined the bucket name 24064091-cloudstorage, then defined the key 'your32-byte-fixed-length-key-here', which is a 32-byte fixed key for AES 256-bit encryption and decryption. BLOCK_SIZE = 16: AES encryption uses a fixed block size, AES block size is always 16 bytes (128 bits). Even if a 256-bit key is used for encryption, the processed data is still encrypted in 16-byte blocks. CHUNK_SIZE = 64 * 1024: This is the chunk size of the data, usually used for processing large files. Data is divided into 64 KB (64 * 1024 bytes) chunks to be encrypted or decrypted in batches, which can reduce memory usage.

##### [4.2.5.2] Define Encrypt function

**Code:**

```python
def encrypt_file(in_filename, out_filename):
    iv = Random.new().read(AES.block_size)
    encryptor = AES.new(KEY, AES.MODE_CBC, iv)
    filesize = os.path.getsize(in_filename)
    
    with open(in_filename, 'rb') as infile:
        with open(out_filename, 'wb') as outfile:
            # 写入文件大小和 IV
            outfile.write(struct.pack('<Q', filesize))
            outfile.write(iv)
            while True:
                chunk = infile.read(CHUNK_SIZE)
                if len(chunk) == 0:
                    break
                elif len(chunk) % 16 != 0:
                    chunk += b' ' * (16 - len(chunk) % 16)
                outfile.write(encryptor.encrypt(chunk))
```

**Description:** Following the next tip, I first create the function encrypt_file(in_filename, out_filename), where in_filename represents the input file to be encrypted, and out_filename represents the encrypted output file. Set the initial vector iv. In AES CBC mode, the initial vector (iv) is used to introduce randomness on the first block of the encryption, thus ensuring that the output of each encryption is different each time, even when the same key is used and the same input data is given. A random initial vector of length AES.block_size is created using a random number generator. Here the length is 16 bytes. After that, a new encryptor object will be created using AES.new(KEY, AES.MODE_CBC, iv). Where AES.MODE_CBC: the CBC mode of AES is selected, which makes the encryption of each block dependent on the encryption result of the previous block, and therefore requires iv as the initialization input for the first block.

Next, the getsize method is used to obtain the size of the input file to record it in the encrypted file. Twice the file size is packed into an 8-byte unsigned integer (<Q denotes a 64-bit integer in small end-order) using the with open() method for the file before and after encryption. A randomly generated initial vector (IV) is written to the output file. The same IV is needed to recover the data when decrypting.

Finally, the input file is read one block at a time from the input file using an infinite loop with a block size of CHUNK_SIZE (64 KB). By reading the file in chunks, it is possible to handle large files and reduce the memory footprint. If the length of the block read is 0, the file has been read, and the loop exits. The CBC mode of AES requires that the encrypted block size must be a multiple of 16 bytes. If the read chunk is not a multiple of 16, then padding is required: chunk += b' " * (16 - len(chunk) % 16) means to make the chunk a multiple of 16 bytes by padding the end of the chunk with a space character (b" '). outfile.write(encryptor.encrypt(chunk)) means that the current chunk has been read using encryptor encrypts the current chunk using encryptor and writes the encrypted data to the output file.

##### [4.2.5.3] Define Decrypt function

**Code:**

```python
def decrypt_file(in_filename, out_filename):
    with open(in_filename, 'rb') as infile:
        origsize = struct.unpack('<Q', infile.read(struct.calcsize('Q')))[0]
        iv = infile.read(16)
        decryptor = AES.new(KEY, AES.MODE_CBC, iv)
        with open(out_filename, 'wb') as outfile:
            while True:
                chunk = infile.read(CHUNK_SIZE)
                if len(chunk) == 0:
                    break
                outfile.write(decryptor.decrypt(chunk))
            outfile.truncate(origsize)
```

**Description:** Next, I defined the function decrypt_file(in_filename, out_filename) to decrypt the file. Where in_filename represents the encrypted input file and out_filename represents the decrypted output file. Use with open method to open the encrypted input file in binary mode ('rb') in order to read the encrypted data in it. struct.unpack('<Q', infile.read(struct.calcsize('Q'))) means to read the size of the original file during encryption. struct.calcsize('Q')) means to read the size of the original file during encryption. construct.calcsize('Q') calculates the size of 8 bytes (<Q means 64-bit unsigned integer with small end-order). infile.read(struct.calcsize('Q')) reads the first 8 bytes of the file, which represents the size of the original file. struct.unpack('<Q', ...) Unpack the read binary data into integer form. origsize: this is the size of the original file, after decryption, we will intercept the file based on this size to remove the padding.

After that the initial vector Iv is read and the decryptor is created respectively (a decryptor in AES CBC mode is created using the same key (KEY) and initial vector (iv) as used for encryption). The output file is then opened in binary mode using the with open() method: the decrypted data is ready to be written. The encrypted chunks are read one at a time in CHUNK_SIZE size. CHUNK_SIZE is usually 64 KB, so the data is processed in chunks. If the length of the block read is 0, the file has been read, and exit the loop. Decrypt each block and write the decrypted data to the output file.

Finally, since AES is block encryption, the last block of the file may have been padded during encryption. Here, we use the truncate method to truncate the file based on the original file size (organize) we recorded earlier, and remove the extra padding to restore the file to its original size.

##### [4.2.5.4] Process Files

**Code:**

```python
def process_s3_bucket(bucket_name):
    try:
        response = s3_client.list_objects_v2(Bucket=bucket_name)
        if 'Contents' in response:
            for item in response['Contents']:
                file_name = item['Key']
                local_file_path = os.path.join('.', file_name)
                
                try:
                    # 确保目录存在
                    os.makedirs(os.path.dirname(local_file_path), exist_ok=True)
                    
                    # 下载文件
                    s3_client.download_file(bucket_name, file_name, local_file_path)
                    
                    # 加密文件
                    enc_file_path = f"{local_file_path}.second_encrypted"
                    encrypt_file(local_file_path, enc_file_path)
                    print(f"文件加密完成：{enc_file_path}")
                    
                    # 解密文件
                    dec_file_path = f"{local_file_path}.decrypted"
                    decrypt_file(enc_file_path, dec_file_path)
                    print(f"文件解密完成：{dec_file_path}")
                    
                    # 上传加密和解密文件到 S3，保持原始文件的目录结构
                    s3_client.upload_file(enc_file_path, bucket_name, f"{file_name}.second_encrypted")
                    s3_client.upload_file(dec_file_path, bucket_name, f"{file_name}.decrypted")
                    
                    # 删除本地文件
                    os.remove(local_file_path)
                    os.remove(enc_file_path)
                    os.remove(dec_file_path)
                except Exception as e:
                    print(f"处理文件时出错：{file_name}, 错误：{str(e)}")
    
    except (NoCredentialsError, PartialCredentialsError) as e:
        print(f"AWS 凭证错误：{str(e)}")
    except Exception as e:
        print(f"An error occurred: {e}")

# 调用 S3 处理函数
process_s3_bucket(bucket_name)
# 文件加密完成：./rootfile.txt.second_encrypted
# 文件解密完成：./rootfile.txt.decrypted
# 文件加密完成：./subdir/subfile.txt.second_encrypted
# 文件解密完成：./subdir/subfile.txt.decrypted
```

**Description:** In the last step, I define a function process_s3_bucket(bucket_name) to process the files in the specified S3 storage bucket. The specific operations include downloading the files, encrypting them, decrypting them, uploading the encrypted and decrypted files, and finally cleaning up the local files.

In the try statement block, the s3_client.list_objects_v2() method is first used to list the objects in the S3 storage bucket. Next, the response is checked to see if it contains the Contents key, which contains all the file objects in the storage bucket. If it does, it iterates through all the files in the bucket, with an item representing the metadata for each file. Get the filename, which is the object key for the file in the S3 bucket. Use the join method to save the file to a local relative path that is consistent with the S3 directory structure.

In the sub-try statement block, the local directory structure is created using the makedirs() method (if it does not exist). Then use os.path.dirname(local_file_path) to get the directory path of the file. This is followed by a judgment call to skip creation and avoid throwing an exception if the directory already exists. Then the download_file() method downloads the file from S3 to the locally specified path.

Finally, name the encrypted and decrypted file, call encrypt_file and decrypt_file to encrypt and decrypt the file, and upload the encrypted and decrypted file back to the S3 storage bucket using the upload_file() method to maintain the original directory structure of the file. Finally, the original, encrypted, and decrypted files are deleted locally using the remove() method to save storage space. And throw an exception.

### [6] Uploading



<div style="page-break-after: always;"></div>

# Lab 5

## Application Load Balancer

### [1] Create 2 EC2 instances

##### [5.1.1.1] Create security group

**Code:**

```python
import boto3
import time

student_number = "24064091"
region_name = "ca-central-1"
availability_zones = ["ca-central-1a", "ca-central-1b"]

# 创建EC2客户端和ELB v2客户端
ec2_client = boto3.client('ec2', region_name=region_name)
elb_client = boto3.client('elbv2', region_name=region_name)

# 创建安全组
security_group_name = f"{student_number}-sg"
description = "Security group for HTTP and SSH access"
vpc_id = ec2_client.describe_vpcs()['Vpcs'][0]['VpcId']

response = ec2_client.create_security_group(
    GroupName=security_group_name,
    Description=description,
    VpcId=vpc_id
)
```

**Description:** Firstly, I started by setting the variables student number, area name, and available area respectively. Then I create EC2 and ELB using the client method, respectively. Then, following the prompts, I first define what the security group contains, where vpc_id indicates the ID of the VPC (virtual private cloud) available in the AWS account using the describe_vpcs() function. Then I call the create_security_group function to create a new security group containing the above.

##### [5.1.1.2] Authorize security group ingress

**Code:**

```python
security_group_id = response['GroupId']

# 添加安全组规则
ec2_client.authorize_security_group_ingress(
    GroupId=security_group_id,
    IpPermissions=[
        {
            'IpProtocol': 'tcp',
            'FromPort': 22,
            'ToPort': 22,
            'IpRanges': [{'CidrIp': '0.0.0.0/0'}]
        },
        {
            'IpProtocol': 'tcp',
            'FromPort': 80,
            'ToPort': 80,
            'IpRanges': [{'CidrIp': '0.0.0.0/0'}]
        }
    ]
)
```

**Description:** Then, when prompted, I called the authorize_security_group_ingress function to add an inbound rule to the specified security group, defining which traffic can enter the associated EC2 instance. groupId: specifies the ID of the security group to be modified. security_group_id is the security group ID that was returned from the previous security group creation. IpPermissions represents a list containing multiple inbound rules, each specifying the allowed protocols, port ranges, and source IP ranges (CIDR). The first rule indicates that the protocol is TCP, the inbound and outbound ports are 22, and the IP range allows access from any IP address. The second rule indicates that the protocol is TCP, the inbound and outbound ports are 80, and the IP range allows access from any IP address.

##### [5.1.1.3] Create, Save and Set permission for keypair

**Code:**

```python
# 创建密钥对
key_pair_name = f"{student_number}-keypair"
key_pair = ec2_client.create_key_pair(KeyName=key_pair_name)

# 保存密钥对的.pem文件
with open(f"{key_pair_name}.pem", "w") as file:
    file.write(key_pair['KeyMaterial'])

# 设置权限为只读
import os
os.chmod(f"{key_pair_name}.pem", 0o400)

# 获取子网ID
subnets = []
for az in availability_zones:
    subnet = ec2_client.describe_subnets(
        Filters=[{'Name': 'availabilityZone', 'Values': [az]}]
    )['Subnets'][0]['SubnetId']
    subnets.append(subnet)
```

**Description:** Following further prompts, I then call the create_key_pair() function to create a new key pair. The returned key_pair contains the details of the key pair, where KeyMaterial is the private key content. Then the with open() method writes the private key part (KeyMaterial) of the generated key pair to a .pem file named 24064091-keypair.pem, which is used for subsequent access to the instance via SSH. Next, I used the chmod() function to change the file permissions. 0o400 means that the file permissions are set to read-only (readable only by the file owner). This is the standard security setting for SSH private key files and prevents other users from accessing the file. After that, I traversed each element of the availability zone using a for loop and used the function describe_subnets(): to look up the subnets in each availability zone. Use the filter to find subnets by available zone names. Use the append() method to add the obtained subnet IDs to the subnets list, ready to be used for subsequent instance creation.

##### [5.1.1.4] Create 2 instances

**Code:**

```python
# 创建两个EC2实例
instances = []
instance_ids = []
for i, az in enumerate(availability_zones):
    instance = ec2_client.run_instances(
        ImageId="ami-048ddca51ab3229ab",
        InstanceType="t2.micro",
        KeyName=key_pair_name,  # 关联密钥对
        MaxCount=1,
        MinCount=1,
        SecurityGroupIds=[security_group_id],
        SubnetId=subnets[i],
        TagSpecifications=[
            {
                'ResourceType': 'instance',
                'Tags': [
                    {'Key': 'Name', 'Value': f"{student_number}-vm{i+1}"}
                ]
            }
        ]
    )
    instance_id = instance['Instances'][0]['InstanceId']
    instances.append(instance)
    instance_ids.append(instance_id)
```

**Description:** Following the hints, I first traversed the values and indexes of each element of the availability zone using a for loop and the function enumerate(availability_zones), and for each element, used the run_instances() method to start the instance, requiring that at least and at most one instance be started at a time, and associating the key pairs created earlier, where TagSpecifications sets the tag for each instance, Key='Name', Value is the name of the instance. Finally, instance information and instance IDs are stored in the instances and instance_ids lists using instances.append(instance) and instance_ids.append(instance_id), respectively, for subsequent use.


### [2] Create an Application Load Balancer

##### [5.1.2.1] Create Load Balancer

**Code:**

```python
# 创建应用负载均衡器
load_balancer = elb_client.create_load_balancer(
    Name=f"{student_number}-lb",
    Subnets=subnets,
    SecurityGroups=[security_group_id],
    Scheme='internet-facing',
    Type='application',
    IpAddressType='ipv4'
)
load_balancer_arn = load_balancer['LoadBalancers'][0]['LoadBalancerArn']
```

**Description:** Following the prompts, I create a new application load balancer using the create_load_balancer() method. The contents include: load balancing name, subnet ID, security group ID, load balancer access scheme, (internet-facing means that the load balancer will be internet-facing, allowing access via public IP) load balancing type, and IP address. load_balancer['LoadBalancers'][0]['LoadBalancerArn']: The response contains information about the load balancer after it has been created. loadBalancerArn is the load balancer's Amazon Resource Name (ARN), which uniquely identifies the load balancer. This ARN will be used in subsequent steps to configure listeners and target groups.

##### [5.1.2.2] Create target group

**Code:**

```python
# 创建目标组
target_group = elb_client.create_target_group(
    Name=f"{student_number}-tg",
    Protocol='HTTP',
    Port=80,
    VpcId=vpc_id,
    TargetType='instance'
)
target_group_arn = target_group['TargetGroups'][0]['TargetGroupArn']

# 注册目标
targets = [{'Id': instance_id} for instance_id in instance_ids]
elb_client.register_targets(
    TargetGroupArn=target_group_arn,
    Targets=targets
)
```

**Description:** Then, following the prompts, I used the elb_client.create_target_group() method to create a new target group. The contents include the target group name, communication protocol (HTTP), port number, VPC ID, and target type (instance). target_group['TargetGroups'][0]['TargetGroupArn']: after the target group is created, the details of the target group are returned in the response. targetGroupArn is the target group's TargetGroupArn is the Amazon Resource Name (ARN) of the target group that uniquely identifies the target group. This ARN is used in subsequent actions such as registering a target with a load balancer or creating a listener.

##### [5.1.2.3] Register targets

**Description:** Next, following the prompts, I register the targets using the register_targets() method. The contents include the target itself and the target group ARN.

##### [5.1.2.4] Create Listener

**Code:**

```python
# 创建监听器
elb_client.create_listener(
    LoadBalancerArn=load_balancer_arn,
    Protocol='HTTP',
    Port=80,
    DefaultActions=[{
        'Type': 'forward',
        'TargetGroupArn': target_group_arn
    }]
)
```

**Description:** Finally, following the prompts, I create the listener using the create_listener() method. The contents include the ARN, protocol, port number, and default behavior of the load balancer to which the listener belongs. Among the default behaviors, Type': "forward": indicates that the listener will forward incoming traffic to the target group.'TargetGroupArn': target_group_arn: specifies the target group ARN to which the traffic will be forwarded, which is uniquely identified by the target group created earlier.


### [3] Test the Application Load Balancer

##### [5.1.3.1] ssh to the first instance

**Description:** At the prompt, I enter the command:

```bash
ssh -i "24064091-keypair.pem" ubuntu@ec2-3-96-184-71.ca-central-1.compute.amazonaws.com
```

to connect to the instance via SSH the first instance 24064091-vm1.

**Explanation:**

- **ssh:** ssh is a command used to connect to a remote server via Secure Shell Protocol (SSH). In this case, it is used to connect to an AWS EC2 instance
- **-i '24064091-keypair.pem':** the -i option specifies the private key file used for authentication.' 24064091-keypair.pem' was generated and downloaded when the key pair was previously created through AWS
- **ubuntu@ec2-3-96-184-71.ca-central-1.compute.amazonaws.com:** ubuntu: This is the username to log in as. In most Ubuntu-based EC2 instances, the default username is ubuntu. ec2-3-96-184-71.ca-central-1.compute.amazonaws.com: this is the public DNS address of the EC2 instance, pointing to a specific instance. ec2-3-96-184-71 is the public IP address (3.96.184.71) of the instance, and ca-central-1.compute.amazonaws.com indicates that the instance is located in the ca-central-1 region of AWS (Central Canada region)

##### [5.1.3.2] update and install apache2 in the first instance

**Description:** Next, I entered the commands:

```bash
sudo apt-get update
sudo apt install apache2
```

to update and install apache2.

**Explanation:** **apache2:** is the name of the package to be installed. On Ubuntu and other Debian-based systems, the Apache HTTP server package is called apache2.

##### [5.1.3.3] Edit title in the webpage

**Description:** Then, I input the command:

```bash
sudo nano /var/www/html/index.html
```

to edit the default web page, after entering the modified page, I will change the title to '24064091-vm1', and then save the exit, and enter the instance 24064091-vm1 in the browser. vm1's public address is 3.96.184.71, and found that the page title has been changed as expected.

**Explanation:** **nano:** is an easy-to-use text editor commonly used on Linux and Unix systems. It provides a command-line based user interface and is suitable for editing various types of text files, such as configuration files, code files, and so on.

##### [5.1.3.4] Do same operations in the second instance

**Description:** Finally, as with instance 24064091-vm1, do the same for instance 24064091-vm2, connecting to the instance via SSH, installing apache2, and changing the default web page title in turn, with the final title display changing to '24064091-vm2'. The public IP address for this instance is 3.96.54.155.

